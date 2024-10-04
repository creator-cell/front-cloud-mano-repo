"use client";
import React, { useState } from "react";

import { CustomHeading } from '@/components/custom/CustomHeading'
import { FileUpload } from "@/components/ui/file-upload";
import SectionLayout from "@/components/common/CommonSectionLayout";
import { CustomParagraph } from "@/components/custom/CustomParagraph";
import Link from "next/link";
import { Download } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ImportProduct = () => {

    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };
    return (
        <div className='w-full flex flex-col gap-y-6 py-5 '>
            <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Import Products</CustomHeading>
            <SectionLayout title="Upload CSV file" className="gap-y-8">

                <div className="w-full flex items-start justify-between">
                    <div>
                        <CustomParagraph className='text-black text-left'>Upload a CSV file to import products</CustomParagraph>
                        <CustomParagraph variant={"small"} className='text-black text-left'>
                            Importing lets you quickly add a lot of products to your store from a csv file.
                            <Link href={"/"} className="text-blue-500 pl-2">Lern More</Link>
                        </CustomParagraph>
                    </div>

                    <Link href={"/"} className="text-blue-500 flex gap-x-2">Download Sample CSV <Download size={20} /> </Link>

                </div>

                <div className="flex items-center gap-6 max-w-[600px]">
                    <Label htmlFor="country" className='whitespace-nowrap w-40'>Data to import</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Products" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Data to import</SelectLabel>
                                <SelectItem value="india">Inventory</SelectItem>
                                <SelectItem value="i">Products</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full mx-auto  border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleFileUpload} />
                </div>

                <div className="flex items-start justify-start gap-x-2">
                    <Checkbox className="w-6 h-6" />
                    <div>
                        <CustomParagraph variant={"xmedium"} className='text-black text-left'>Overwrite existing products</CustomParagraph>
                        <CustomParagraph variant={"small"} className='text-gray-400 text-left'>If checked, any products in your catalog with matching product IDs will be updated by the import.</CustomParagraph>
                    </div>
                </div>
                <Button variant={"secondary"} className="text-gray-500 w-fit px-5">Preview</Button>

            </SectionLayout>
        </div >
    )
}

export default ImportProduct


