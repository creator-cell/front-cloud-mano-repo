"use client";

import React from 'react'

// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormFieldType } from '@/enum/formTypes';
import { cn } from '@/lib/utils';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '../ui/checkbox';
import { FileUpload } from '../ui/file-upload';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import dynamic from 'next/dynamic';

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Multiselect } from "multiselect-react-dropdown";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


export interface CustomFormFieldProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    // control: Control<FormSchema>;
    // name: "password" | "email";
    control: Control<T>;
    fieldType: FormFieldType;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    selectOptions?: { label: string; value: string }[];
    style?: React.CSSProperties;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string | boolean | File[]) => void;
}


const modules = {
    toolbar: [

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'font': [] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction



        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]
}



const RenderField = <T extends FieldValues>({ field, props }: { field: any; props: CustomFormFieldProps<T> }) => {
    const { className, onChange, value, control, fieldType, label, selectOptions, ...inputProps } = props; // Destructure unwanted props
    const { defaultValue: defaultvalue, ...restfields } = props;
    const commonProps = {
        ...field,
        ...inputProps, // Spread only the acceptable input props
        value: field.value ?? '',
    };
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                // border border-[#e0e0e0]
                <div className='flex   rounded-[6px] w-full'>
                    <FormControl >
                        <Input
                            {...field}
                            {...commonProps}
                            onChange={(e) => {
                                field.onChange(e);
                                props.onChange?.(e);
                            }}
                            className={cn(` border-0`, className)} />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <Input
                        {...field}
                        {...commonProps}
                        // // defaultValue={defaultValue}
                        onChange={(e) => {
                            field.onChange(e);
                            props.onChange?.(e);
                        }}
                        className={cn(` border-0`, className)}
                        maxLength={10} // Limit input to 10 digits
                        inputMode="numeric" // Mobile browsers will show numeric keypad
                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                            if (!/^[0-9]*$/.test(event.key)) {
                                event.preventDefault(); // Prevent non-numeric characters
                            }
                        }}
                    />
                </FormControl>
            )
        case FormFieldType.FLOATINGLABELTEXTFIELD:
            return (
                <div className='relative h-12'>
                    <FormControl>
                        <input
                            id={props.name}
                            {...field}
                            {...commonProps}
                            onChange={(e) => {
                                field.onChange(e);
                                props.onChange?.(e);
                            }}
                            className={cn(
                                "peer h-10 w-full border-b-2 border-gray-300 bg-transparent  text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600",
                                className
                            )}
                            placeholder=" "
                        />
                    </FormControl>
                    <FormLabel
                        htmlFor={props.name}
                        className="absolute left-0 -top-2.5 text-gray-600 text-sm transition-all duration-200 transform -translate-y-1/2 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                    >
                        {props.placeholder}
                    </FormLabel>

                </div>
            )

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        {...field}
                        {...commonProps}
                        onValueChange={(value) => {
                            field.onChange(value);
                            props.onChange?.(value);
                        }}
                    >
                        <SelectTrigger className={cn("w-full", className)}>
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props?.selectOptions?.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
            )

        case FormFieldType.MULTISELECT:
            return (
                <FormControl>
                    <Multiselect
                        options={props.selectOptions}
                        selectedValues={field.value}
                        displayValue="label"
                        onSelect={(selectedList) => {
                            field.onChange(selectedList);
                            props.onChange?.(selectedList);
                        }}
                        onRemove={(selectedList) => {
                            field.onChange(selectedList);
                            props.onChange?.(selectedList);
                        }}
                        placeholder={props.placeholder}
                        showCheckbox
                        className={cn('h-40', className)}
                        style={{
                            chips: {
                                background: '#0166A1',
                                color: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            },
                            searchBox: {
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            },
                            option: {
                                // background: "#0166A1",
                                // color: "white"
                            },

                        }}
                    />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <div className='flex items-center gap-x-2'>

                    <FormControl>
                        <Checkbox
                            {...field}
                            {...commonProps}
                            onCheckedChange={(checked: boolean) => {
                                field.onChange(checked);
                                props.onChange?.(checked);
                            }}
                            className={cn(
                                "peer  border-gray-300 text-blue-600 focus:ring-blue-500",
                                className
                            )}
                        />
                    </FormControl>
                    <FormLabel
                        htmlFor={props.name}
                        className='text-gray-600 text-sm whitespace-nowrap w-full'
                    // className="absolute left-0 -top-2.5 text-gray-600 text-sm transition-all duration-200 transform -translate-y-1/2 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                    >
                        {props.placeholder}
                    </FormLabel>
                </div>
            )

        case FormFieldType.RADIOGROUP:
            return (
                <FormControl>
                    <div className={cn(`flex flex-col gap-y-2 justify-start`, className)}>
                        <RadioGroup
                            {...field}
                            {...commonProps}
                            onValueChange={(value: string) => {
                                field.onChange(value);
                                props.onChange?.(value);
                            }}

                        >
                            {props?.selectOptions?.map(option => (
                                <div key={option.value} className='flex items-center gap-x-2'>
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`${props.name}-${option.value}`}
                                        className="peer h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <FormLabel
                                        htmlFor={`${props.name}-${option.value}`}
                                        className='text-gray-600 text-sm whitespace-nowrap w-full'
                                    >
                                        {option.label}
                                    </FormLabel>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </FormControl>
            )

        case FormFieldType.FILEUPLOAD:
            return (
                <FormControl>
                    <div>
                        <FileUpload
                            onChange={(files: File[]) => {
                                field.onChange(files);
                                props.onChange?.(files);
                            }}
                        // onChange={onChange}
                        />
                    </div>
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <FormControl>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(selectedDate) => {
                                        field.onChange(selectedDate);
                                        // props.onChange?.(selectedDate);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </FormControl>
            )
        case FormFieldType.RICHTEXTEDITOR:
            return (
                <FormControl>
                    <ReactQuill
                        theme="snow"
                        // className='h-72'
                        className={cn("h-72", className)}
                        // value={watch}
                        onChange={(value) => {
                            field.onChange(value);
                            props.onChange?.(value);
                        }}
                        modules={modules}
                        {...field}
                    />
                </FormControl>
            )

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <textarea
                        {...field}
                        {...commonProps}
                        rows={2}
                        onChange={(e) => {
                            field.onChange(e);
                            props.onChange?.(e);
                        }}
                        className={cn(
                            "w-full py-2 px-4",
                            className
                        )}
                    />
                </FormControl>
            )

        case FormFieldType.OTP_INPUT:
            return (
                <FormControl>

                    <InputOTP
                        maxLength={6}
                        // value={value}
                        // {...inputProps}
                        // {...field}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </FormControl>

            )
        default:
            return null;
    }

}

const CustomFormField = <T extends FieldValues>(props: CustomFormFieldProps<T>) => {
    const { control, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='relative'>
                    <FormLabel className='text-gray-900'>{label}</FormLabel>
                    <RenderField field={field} props={props} />
                    <FormMessage className='text-[12px] text-red-500 font-[400] absolute -bottom-5 left-0' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField




