import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

interface ImageUploadProps {
    label?: string;
    defaultImage?: string; // URL of the default image to show if no file is uploaded
    onFileChange: (file: File | null) => void; // Callback for the parent component
    acceptedFileTypes?: string; // Allowed file types (e.g., "image/*")
    containerClassName?: string; // Custom styles for the container
    imageClassName?: string; // Custom styles for the image
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    defaultImage,
    onFileChange,
    acceptedFileTypes = 'image/*',
    containerClassName = '',
    imageClassName = ''
}) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL for the selected file
            onFileChange(file); // Pass the file back to the parent component
        }
    };

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input dialog
        }
    };

    useEffect(() => {
        // Clean up the preview URL on unmount
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div className={`relative border rounded-md overflow-hidden ${containerClassName}`}>
            {previewUrl ? (
                <div className="relative aspect-video w-full">
                    <Image
                        src={previewUrl}
                        alt="Uploaded"
                        layout="fill"
                        objectFit="cover"
                        className={imageClassName}
                    />
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={handleEditClick}
                    >
                        <Button variant="ghost" className="text-white hover:bg-transparent">
                            <PencilIcon />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                    onClick={handleEditClick}
                >
                    <span className="text-sm text-gray-500">Click to upload an image</span>
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFileTypes}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUpload;