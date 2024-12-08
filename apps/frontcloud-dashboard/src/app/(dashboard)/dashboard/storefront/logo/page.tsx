"use client"

import React, { useEffect, useRef, useState } from 'react'
import PageWrapper from '../../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Form } from '@/components/ui/form';
import ColorPicker from 'react-pick-color';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOutsideClick } from '@/components/ui/animated-modal';
import logoSchema, { LogoFormValues } from '@/zod/storefront/add-logo.schema';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { useAddLogoMutation, useGetLogoByStoreIdQuery, useUpdateLogoMutation } from '@/store/api/store/storefront/logo';
import { toast } from 'sonner';
import ImageUpload from '@/components/common/ImageUploadPreview';

const LogoPage = () => {

    const { data, isSuccess } = useGetLogoByStoreIdQuery("1")

    const form = useForm<LogoFormValues>({
        resolver: zodResolver(logoSchema),
        defaultValues: {
            logo_type: 'logo_text',
            FontColor: '#000000',
            FontSize: '28',
        },
        mode: "all",
        reValidateMode: "onChange",
        criteriaMode: "all",
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
        setValue
    } = form;

    console.log("errror", errors)


    console.log("🚀 ~ LogoPage ~ data: ---->>>", data?.Data)

    useEffect(() => {


        setValue("logo_type", data?.Data[0].IsLogo ? 'logo_image' : 'logo_text')
        setValue("FontColor", data?.Data[0].FontColor)
        setValue("FontSize", data?.Data[0].FontSize.toString())
        setValue("StoreLogoText", data?.Data[0].StoreLogoText)

        const logo_image = data?.Data[0].Images.find(image => image.ItemType === 'storelogo')?.ImageURL || "";

        console.log("🚀 ~ useEffect ~ logo_image:", logo_image)
        const favicon_image = data?.Data[0].Images.find(image => image.ItemType === 'favicon')?.ImageURL || "";
        console.log("🚀 ~ useEffect ~ favicon_image:", favicon_image)

        setValue("Logo", logo_image)
        setValue("Favicon", favicon_image)


    }, [data, isSuccess])

    const [UpdateLogo, { isLoading }] = useUpdateLogoMutation()


    async function fetchFileFromURL(url: string): Promise<File | null> {
        try {
            const response = await fetch(url, {
                method: "GET",
                mode: "cors", // Enable CORS if supported
            });

            if (!response.ok) {
                console.error(`Error fetching the file. Status: ${response.status}`);
                return null;
            }

            const blob = await response.blob();
            const fileName = url.split('/').pop() || "file";
            return new File([blob], fileName, { type: blob.type });
        } catch (error) {
            console.error("Error fetching file from URL:", error);
            return null;
        }
    }


    console.log("🚀 ~ LogoPage ~ watch('Logo')________>>>>>>>>>>>>>>>", watch('Favicon'))



    const onSubmit = async (data: LogoFormValues) => {
        console.log("Form data:", data);
        console.log("Form data:_------<>>>", watch("Logo"), watch("Favicon"));

        const formData = new FormData();

        if (data.logo_type === "logo_text" && data.FontColor && data.FontSize && data.StoreLogoText) {
            // Append fields related to text logo
            formData.append("IsLogo", "false"); // Send false as string for FormData
            formData.append("FontColor", data.FontColor);
            formData.append("FontSize", data.FontSize);
            formData.append("StoreLogoText", data.StoreLogoText);
        } else if (data.logo_type === "logo_image") {
            // Append fields related to image logo
            formData.append("IsLogo", "true");
            const logo = watch("Logo");
            if (logo?.type?.startsWith("image/")) {
                formData.append("Logo", logo);
            }
        }

        // Fetch favicon directly using watch or getValues
        const favicon = watch("Favicon");

        if (favicon) {
            if (favicon?.type?.startsWith("image/")) {
                formData.append("Favicon", favicon);
            }
        }


        const promise = UpdateLogo({ id: "1", data: formData }).unwrap();

        toast.promise(promise, {
            loading: 'Uploading...',
            success: 'Logo added successfully',
            error: 'Failed to add logo',
        });

        try {
            const response = await promise;
            console.log("response", response);
            setValue("Logo", null);
            setValue("Favicon", null);
        } catch (err) {
            console.log("error", err);
        }
    };



    useEffect(() => {

        if (watch("logo_type") === 'logo_text') {
            setValue("Logo", null)
        } else if (watch("logo_type") === 'logo_image') {
            setValue("StoreLogoText", undefined)
            setValue("FontSize", undefined)
            setValue("FontColor", undefined)
        }

    }, [watch("logo_type")])

    const fontColor = watch("FontColor");


    const [openColorPicker, setOpenColorPicker] = useState<boolean>(false)

    const fontSizeOptions = [
        { label: "14", value: "14" },
        { label: "16", value: "16" },
        { label: "18", value: "18" },
        { label: "20", value: "20" },
        { label: "22", value: "22" },
        { label: "24", value: "24" },
        { label: "26", value: "26" },
        { label: "28", value: "28" },
        { label: "30", value: "30" },
        { label: "32", value: "32" },
        { label: "34", value: "34" },
        { label: "36", value: "36" },
        { label: "38", value: "38" },
        { label: "40", value: "40" },
        { label: "42", value: "42" },
        { label: "44", value: "44" },
        { label: "46", value: "46" },
        { label: "48", value: "48" },
        { label: "50", value: "50" },
        { label: "52", value: "52" },
        { label: "54", value: "54" },
        { label: "56", value: "56" },
        { label: "58", value: "58" },
        { label: "60", value: "60" },
        { label: "62", value: "62" },
        { label: "64", value: "64" },
        { label: "66", value: "66" },
        { label: "68", value: "68" },
        { label: "70", value: "70" },
        { label: "72", value: "72" },
        { label: "74", value: "74" },
    ]

    const colorPickerRef = useRef<HTMLDivElement>(null)

    useOutsideClick(colorPickerRef, () => {
        setOpenColorPicker(false)
    })



    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
        const files = event.target.files;
        if (files && files.length > 0) {
            if (type === 'logo') { setValue("Logo", files[0]); }
            else { setValue("Favicon", files[0]); }
        }
    };

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input dialog
        }
    };

    const imageValue = watch("Logo"); // Either a file object or a hosted URL
    const isFile = imageValue instanceof File; // Check if the value is a File object
    const imageUrl = isFile ? URL.createObjectURL(imageValue) : imageValue; // Generate preview if file, else use the URL

    const faviconUrl = watch("Favicon"); // Either a file object or a hosted URL
    const isFaviconFile = faviconUrl instanceof File; // Check if the value is a File object
    const faviconImageUrl = isFaviconFile ? URL.createObjectURL(faviconUrl) : faviconUrl; // Generate preview if file, else use the URL



    return (
        <PageWrapper title='Logo Options' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <SectionLayout title='Logo' className='space-y-6' >
                        <CustomFormField
                            control={control}
                            fieldType={FormFieldType.SELECT}
                            name="logo_type"
                            defaultValue='logo_text'
                            className=' focus:ring-0  w-96'
                            selectOptions={[
                                { label: 'Enter text to display as your logo', value: 'logo_text' },
                                { label: 'Upload a custom image to use as your logo', value: 'logo_image' },
                            ]}
                        />
                        {
                            watch('logo_type') === 'logo_image' ?
                                <div className='border rounded-md'>
                                    {/* <FileUpload
                                        onChange={(files) => {
                                            setValue("Logo", files);
                                        }}
                                        fileType={FileType.ANY_IMAGE}
                                        multiple={false}
                                    /> */}
                                    <ImageUpload
                                        label="Logo"
                                        defaultImage={watch("Logo")} // Pass the default logo URL if available
                                        onFileChange={(file) => setValue("Logo", file)} // Update the `Logo` field in the form
                                    />


                                </div>
                                : watch('logo_type') === 'logo_text' ?
                                    <div className='grid grid-cols-2 gap-y-7'>
                                        <div className=''>
                                            <CustomFormField
                                                control={control}
                                                fieldType={FormFieldType.SELECT}
                                                name="FontSize"
                                                label='Font Size'
                                                className=' focus:ring-0  w-96'
                                                selectOptions={fontSizeOptions}
                                            />
                                        </div>
                                        <div>
                                            <Label>Font Color</Label>
                                            <div className='flex gap-x-3 items-end'>
                                                <div>
                                                    <CustomFormField
                                                        control={control}
                                                        fieldType={FormFieldType.INPUT}
                                                        name="FontColor"
                                                        className={` focus:ring-1 ring-1 `}
                                                    />
                                                </div>
                                                <div className='relative size-11'
                                                >

                                                    <Button asChild className='cursor-pointer size-full' onClick={() => setOpenColorPicker(!openColorPicker)} >
                                                        <div className={`border relative`} style={{ backgroundColor: watch("FontColor") }}>
                                                        </div>
                                                    </Button>
                                                    {
                                                        openColorPicker &&
                                                        <div className='absolute top-full left-full z-50' ref={colorPickerRef}>
                                                            <ColorPicker color={watch("FontColor")} onChange={color => setValue("FontColor", color.hex)} />
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                        <div className='col-span-2'>
                                            <CustomFormField
                                                control={control}
                                                fieldType={FormFieldType.TEXTAREA}
                                                name="StoreLogoText"
                                                placeholder='Enter text to display as your logo'
                                                className={` focus:ring-1 ring-1 rounded-md text-[${fontColor}] `}
                                                style={{ fontSize: Number(watch('FontSize')), color: watch('FontColor') }}
                                            />
                                        </div>
                                    </div>
                                    : null
                        }
                    </SectionLayout>
                    <SectionLayout title='Favicon' className='space-y-6'>
                        <CustomParagraph variant='small' className='text-left'>A favicon is a small image that appears in the browser tab when your store is open. It helps customers identify your store.</CustomParagraph>
                        {/* <div className='border rounded-md'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("Favicon", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                                multiple={false}


                            />
                        </div> */}

                        {
                            watch('logo_type') === 'logo_image' &&
                            <ImageUpload

                                label="Favicon"
                                defaultImage={watch("Favicon")} // Pass the default favicon URL if available
                                onFileChange={(file) => setValue("Favicon", file)} // Update the `Favicon` field in the form
                            />
                        }



                        <CustomParagraph variant='small' className='text-left'>
                            Supported file types: ICO, JPG, GIF, PNG
                            <span className='ml-2'>  Recommended size: 32 x 32px</span>
                        </CustomParagraph>
                    </SectionLayout>


                    <ActionBarLayout>
                        <Button variant="ghost" type='button' className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Update</Button>
                    </ActionBarLayout>
                </form>
            </Form>
        </PageWrapper >
    )
}



export default LogoPage
