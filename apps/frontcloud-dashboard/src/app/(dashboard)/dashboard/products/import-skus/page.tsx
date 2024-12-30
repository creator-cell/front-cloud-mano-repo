"use client";
import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label'
import { FormFieldType } from '@/enum/formTypes'
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import React, { useContext } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import useMediaQuery from '@/hooks/useMedia';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { FileUpload } from '@/components/ui/file-upload';
import { FileType } from '@/enum/fileTypes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProductsJsonFromFile } from '@/utils/Import-productFromFile';
import { addProductFormValuesNew } from '@/zod/addProduct.schema';
import { usePostBulkProductsMutation } from '@/store/api/products';
import { toast } from 'sonner';

// Define the Zod schema
const ImportSchema = z.object({
    importForm: z.enum(['upload', 'existing']).default('upload'),
    file: z
        .array(z.instanceof(File))  // Accepts an array of File objects
        .min(1, 'At least one file is required'),
});

type ImportFormValues = z.infer<typeof ImportSchema>;



const ImportSKUs = () => {

    const [PostBulkProducts, { isLoading }] = usePostBulkProductsMutation()


    const form = useForm<ImportFormValues>({
        resolver: zodResolver(ImportSchema),
        defaultValues: {
            importForm: 'upload',
            file: undefined,
        }
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const watchImportForm = watch('importForm');

    const onSubmit = async (data: any) => {
        console.log("Form data:", data);
        let productJsonData = [] as any;
        if (data.file) {
            productJsonData = await getProductsJsonFromFile(data.file[0]); // convert the CSV or Excel file to JSON Array
        }
        console.log("🚀 ~ onSubmit ~ productJsonData:", productJsonData)

        try {
            const promise = PostBulkProducts(productJsonData).unwrap();

            toast.promise(promise, {
                loading: 'Importing products...',
                success: 'Products imported successfully',
                error: 'Failed to import products',
            });

        } catch (e) {
            console.log("🚀 ~ onSubmit ~ e", e)
        }

    };

    const { state } = useContext(SideBarOpenCloseContext);




    return (
        <div className={`w-full flex flex-col gap-y-3 pt-20 ${!state.sideBarOpen && "px-6"}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <SectionLayout title='Import Products From CSV or Excel files' className='space-y-6 py-4 relative'>
                        <div className='space-y-3'>
                            <Label>Import File:</Label>
                            <CustomFormField
                                fieldType={FormFieldType.RADIOGROUP}
                                defaultValue={"upload"}
                                name={"importForm"}
                                control={control}
                                selectOptions={[
                                    { label: "Upload a CSV file from my computer (20 MB size limit)", value: "upload" },
                                    { label: "Use a file already on the server", value: "existing" },
                                ]}
                            />
                            <Button
                                className=" h-9 px-6 absolute top-2 right-4"
                                type='button'
                                onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = "/data/csvProducts.csv"; // Path to your sample CSV in the public folder
                                    link.download = "csvProducts.csv";
                                    link.click();
                                }}
                            >
                                Download Sample File
                            </Button>
                            {watchImportForm === 'upload' && (
                                <SectionLayout className='px-6 pb-8  space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <CustomParagraph variant='medium' className='text-black text-left'>Product File</CustomParagraph>
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1 border'>
                                        <FileUpload
                                            onChange={(files) => {
                                                console.log("🚀 ~ files:", files);
                                                setValue("file", files);
                                            }}
                                            multiple={false}
                                            fileType={FileType.PRODUCT_UPLOAD}
                                        />
                                        {errors.file && (
                                            <p className='text-red-500 text-xs relative top-7'>{errors.file.message as string}</p>
                                        )}
                                    </div>
                                </SectionLayout>
                            )}
                        </div>
                    </SectionLayout>
                    <ActionBarLayout>
                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancel</Button>
                        <Button variant="default" disabled={isLoading} className="text-white capitalize tracking-wider h-9 px-6">Add</Button>
                    </ActionBarLayout>
                </form>
            </Form>
        </div>
    );
};

export default ImportSKUs;
