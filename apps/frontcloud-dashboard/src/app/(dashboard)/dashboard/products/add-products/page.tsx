"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useMemo, useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import 'react-quill/dist/quill.snow.css';

import { AdProductFormSections, ProductFormSectionIds } from '@/enum/dashboard/products/add';
import { AddProductFormSchemaNew, addProductFormValuesNew } from '@/zod/addProduct.schema';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import SectionLayout from '@/components/common/CommonSectionLayout';
import CustomFormField from '@/components/common/CustomFormField';

import useMediaQuery from '@/hooks/useMedia';

import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';

import { FormFieldType } from '@/enum/formTypes';
import { FileType } from '@/enum/fileTypes';
import VariantAttributeForm from '@/components/VariantOptionsForm';
import { toast } from 'sonner';
import { useAddProductsMutation, useGetProductByIdQuery } from '@/store/api/products';
import { useRouter, useSearchParams } from 'next/navigation';
import camelcaseKeys from "camelcase-keys";
import { useGetAllCategoriesQuery } from '@/store/api/products/category';
import AddProductFrom from '@/components/dashboard/products/ProductAddForm';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const AddProduct = () => {

    const searchParams = useSearchParams()

    const productId = searchParams.get('id')
    console.log("🚀 ~ AddProduct ~ productId:", productId)

    const { data } = useGetProductByIdQuery(productId ?? "0")
    console.log("🚀 ~ AddProduct ~ data:", data)



    const { data: AllCategories } = useGetAllCategoriesQuery()


    console.log("🚀 ~ AddCategories ~ AllCategories:", AllCategories)
    const parentCategoryOptions = useMemo(() => {
        if (AllCategories && AllCategories.Data.length > 0) {
            return AllCategories.Data.map((category) => ({
                label: category.CategoryName,
                value: category?.CategoryID?.toString() ?? " ",
            }));
        }
        return [];
    }, [AllCategories]);



    let camelCaseData;
    if (data && data.Data) {
        // camelCaseData = camelcaseKeys(data?.data, { deep: true });
    }


    return (
        <div className='w-full '>
            {
                productId ? data?.Data?.product && (
                    <AddProductFrom
                        productData={data?.Data}
                        parentCategoryOptions={parentCategoryOptions}
                    />
                ) : (
                    <AddProductFrom
                        parentCategoryOptions={parentCategoryOptions}
                    />
                )
            }

        </div >

    )
}

export default AddProduct
