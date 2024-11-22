"use client"
import React, { useEffect, useRef, useState } from 'react'
import PageWrapper from '../../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Form } from '@/components/ui/form';
import { FileUpload } from '@/components/ui/file-upload';
import { FileType } from '@/enum/fileTypes';
import ColorPicker from 'react-pick-color';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOutsideClick } from '@/components/ui/animated-modal';
import logoSchema, { LogoFormValues } from '@/zod/storefront/add-logo.schema';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';

const LogoPage = () => {
    const form = useForm<LogoFormValues>({
        resolver: zodResolver(logoSchema),
        defaultValues: {
            logo_type: 'logo_text',
            font_color: '#000000',
            font_size: '28',
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
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };


    useEffect(() => {

        if (watch("logo_type") === 'logo_text') {
            setValue("logo_image", null)
        } else if (watch("logo_type") === 'logo_image') {
            setValue("logo_text", undefined)
            setValue("font_size", undefined)
            setValue("font_color", undefined)
        }

    }, [watch("logo_type")])

    const fontColor = watch("font_color");


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

    console.log("watch", watch("font_color"))

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
                                    <FileUpload
                                        onChange={(files) => {
                                            setValue("logo_image", files);
                                        }}
                                        fileType={FileType.ANY_IMAGE}
                                        multiple={false}
                                    />
                                </div>
                                : watch('logo_type') === 'logo_text' ?
                                    <div className='grid grid-cols-2 gap-y-7'>
                                        <div className=''>
                                            <CustomFormField
                                                control={control}
                                                fieldType={FormFieldType.SELECT}
                                                name="font_size"
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
                                                        name="font_color"
                                                        className={` focus:ring-1 ring-1 `}
                                                    />
                                                </div>
                                                <div className='relative size-11'
                                                >

                                                    <Button asChild className='cursor-pointer size-full' onClick={() => setOpenColorPicker(!openColorPicker)} >
                                                        <div className={`border relative`} style={{ backgroundColor: watch("font_color") }}>
                                                        </div>
                                                    </Button>
                                                    {
                                                        openColorPicker &&
                                                        <div className='absolute top-full left-full z-50' ref={colorPickerRef}>
                                                            <ColorPicker color={watch("font_color")} onChange={color => setValue("font_color", color.hex)} />
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                        <div className='col-span-2'>
                                            <CustomFormField
                                                control={control}
                                                fieldType={FormFieldType.TEXTAREA}
                                                name="logo_text"
                                                placeholder='Enter text to display as your logo'
                                                className={` focus:ring-1 ring-1 rounded-md text-[${fontColor}] `}
                                                style={{ fontSize: Number(watch('font_size')), color: watch('font_color') }}
                                            />
                                        </div>
                                    </div>
                                    : null
                        }
                    </SectionLayout>
                    <SectionLayout title='Favicon' className='space-y-6'>
                        <CustomParagraph variant='small' className='text-left'>A favicon is a small image that appears in the browser tab when your store is open. It helps customers identify your store.</CustomParagraph>
                        <div className='border rounded-md'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("favicon_image", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                                multiple={false}


                            />
                        </div>
                        <CustomParagraph variant='small' className='text-left'>
                            Supported file types: ICO, JPG, GIF, PNG
                            <span className='ml-2'>  Recommended size: 32 x 32px</span>
                        </CustomParagraph>
                    </SectionLayout>


                    <ActionBarLayout>
                        <Button variant="ghost" type='button' className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Save</Button>
                    </ActionBarLayout>
                </form>
            </Form>
        </PageWrapper >
    )
}

export default LogoPage
