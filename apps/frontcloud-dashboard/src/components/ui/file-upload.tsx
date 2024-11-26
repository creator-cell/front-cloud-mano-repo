import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Trash2 } from 'lucide-react';
import { useDropzone } from "react-dropzone";
import { FileType } from "@/enum/fileTypes";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', "image/tiff"];


const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({
    onChange,
    fileType,
    setError,
    clearErrors,
    multiple = true,
    defaultFiles = [],
}: {
    onChange?: (files: File[]) => void;
    fileType?: FileType;
    setError?: UseFormSetError<any>;
    clearErrors?: () => void;
    multiple?: boolean;
    defaultFiles?: (File | string)[];
}) => {
    const [files, setFiles] = useState<File[]>([]);
    console.log("🚀 ~ files:", files)
    const fileInputRef = useRef<HTMLInputElement>(null);



    const handleFileChange = useCallback((newFiles: File[]) => {
        // console.log("🚀 ~ newFiles:", newFiles[0].type)
        // Clear previous error or toast
        toast.dismiss();

        switch (fileType) {
            case FileType.IMAGE_GIF:
                if (!newFiles[0]?.type.includes('image/gif')) {
                    setError && setError('images', { type: 'fileType', message: 'Only GIF files are allowed' });
                    return;
                }
                break;
            case FileType.IMAGE_JPEG:
                if (!newFiles[0]?.type.includes('image/jpeg')) {
                    setError && setError('images', { type: 'fileType', message: 'Only JPEG files are allowed' });
                    return;
                }
                break;
            case FileType.IMAGE_PNG:
                if (!newFiles[0]?.type.includes('image/png')) {
                    setError && setError('images', { type: 'fileType', message: 'Only PNG files are allowed' });
                    return;
                }
                break;
            case FileType.IMAGE_WEBP:
                if (!newFiles[0]?.type.includes('image/webp')) {
                    setError && setError('images', { type: 'fileType', message: 'Only WEBP files are allowed' });
                    return;
                }
                break;
            case FileType.PDF:
                if (!newFiles[0].type.includes('application/pdf')) {
                    toast.error('Only PDF files are allowed');
                    return;
                }
                break;
            case FileType.ANY_IMAGE:
                if ((!newFiles[0]?.type.includes('image') || !ACCEPTED_FILE_TYPES.includes(newFiles[0]?.type)) && newFiles.length > 0) {
                    return toast.error('Only image files are allowed');
                } else if (newFiles[0]?.size > MAX_FILE_SIZE) {
                    return toast.error('File size must be less than 5MB');
                }
                break;
            default:
                break;
        }

        // Validating files
        let validFiles: File[];

        switch (fileType) {
            case FileType.IMAGE_GIF:
                validFiles = newFiles.filter(file => file.type.includes('image/gif'));
                break;
            case FileType.IMAGE_JPEG:
                validFiles = newFiles.filter(file => file.type.includes('image/jpeg'));
                break;
            case FileType.IMAGE_PNG:
                validFiles = newFiles.filter(file => file.type.includes('image/png'));
                break;
            case FileType.IMAGE_WEBP:
                validFiles = newFiles.filter(file => file.type.includes('image/webp'));
                break;
            case FileType.PDF:
                validFiles = newFiles.filter(file => file.type.includes('application/pdf'));
                break;
            case FileType.ANY_IMAGE:
                validFiles = newFiles.filter(file =>
                    ACCEPTED_FILE_TYPES.includes(file.type) &&
                    file.size <= MAX_FILE_SIZE
                );
                break;
            default:
                validFiles = newFiles;
                break;
        }

        if (multiple) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
            onChange && onChange(validFiles);
            return;
        } else {
            setFiles(validFiles);
            onChange && onChange(validFiles);
        }

        // setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        // onChange && onChange(validFiles);

    }, [fileType, onChange]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteFile = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
        onChange && onChange(files.filter(file => file !== fileToRemove)); // Notify parent component
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    multiple={multiple}
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                        Upload file
                    </p>
                    <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                        Drag or drop your files here or click to upload
                    </p>
                    <div className="relative w-full mt-10 max-w-xl mx-auto">
                        {files.length > 0 &&
                            files.map((file, idx) => (
                                <motion.div
                                    key={"file" + idx}
                                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                                    className={cn(
                                        "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                        "shadow-sm"
                                    )}
                                >
                                    <div className="flex justify-between w-full items-center gap-4">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                        >
                                            {file.name}
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                        >
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </motion.p>
                                        <button
                                            onClick={() => handleDeleteFile(file)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                        >
                                            {file.type}
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                        >
                                            modified{" "}
                                            {new Date(file.lastModified).toLocaleDateString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        {!files.length && (
                            <motion.div
                                layoutId="file-upload"
                                variants={mainVariant}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                                )}
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-neutral-600 flex flex-col items-center"
                                    >
                                        Drop it
                                        <FileUp className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                    </motion.p>
                                ) : (
                                    <FileUp className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                )}
                            </motion.div>
                        )}

                        {!files.length && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                                ? "bg-gray-50 dark:bg-neutral-950"
                                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                                }`}
                        />
                    );
                })
            )}
        </div>
    );
}
