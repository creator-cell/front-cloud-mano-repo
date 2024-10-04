"use client";

import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label'
import { FormFieldType } from '@/enum/formTypes'
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const tabs: Array<{ value: string, title: string }> = [
    {
        value: "export_option",
        title: "Export options"
    },
    {
        value: "export_preview",
        title: "Export preview"
    }
]

const ExportSKUs = () => {

    const form = useForm<any>({
        // resolver: zodResolver(AddProductFormSchema),
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const watchImportForm = watch('importForm')

    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };

    const { state } = useContext(SideBarOpenCloseContext);
    const isTablet = useMediaQuery('(max-width: 768px)');


    const [activeTab, setActiveTab] = useState("export_option");

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        console.log("Active Tab:", value);
    };


    return (
        <div className={`w-full flex flex-col gap-y-6  py-20 min-h-screen ${!state.sideBarOpen && "px-6"} `}>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'> Export SKUs</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>
                    Determine the format of your exported SKUs by selecting an export template or <Link href={"#"} className='text-blue-500 cursor-pointer'>create a new export template.</Link>
                </CustomParagraph>
            </div>

            <Tabs defaultValue="export_option"
                onValueChange={handleTabChange}
                className="w-full space-y-6" >

                <TabsList className="flex gap-x-6 relative w-full items-center justify-start">
                    {tabs.map((tab, idx) => {
                        const isActive = activeTab === tab.value;
                        return (
                            <TabsTrigger
                                key={tab.title}
                                value={tab.value}
                                className={"relative px-4 py-2 rounded-full"}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="clickedbutton"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                        className={"absolute inset-0 bg-white dark:bg-zinc-800 rounded-md "}
                                    />
                                )}

                                <span className={`relative block  dark:text-white  ${isActive ? "text-black" : "text-gray-500"}`}>
                                    {tab.title}
                                </span>
                            </TabsTrigger>
                        )
                    }
                    )}
                </TabsList>


                <TabsContent value={activeTab} className=' p-4 bg-white'>
                    {
                        activeTab === 'export_option' &&
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>
                                    <SectionLayout title='File details' className='space-y-6'>


                                        <div className='flex items-center justify-between w-96'>
                                            <Label className='w-40'> Template:</Label>
                                            <div className='flex-1'>
                                                <CustomFormField
                                                    fieldType={FormFieldType.SELECT}
                                                    name={"fieldEnclosure"}
                                                    control={control}
                                                    placeholder='Select a template'
                                                    selectOptions={[
                                                        { label: "Default Template", value: "default" },
                                                        { label: "Custom Template", value: "Custom" },
                                                    ]}
                                                />
                                            </div>
                                        </div>


                                        <div className='space-y-3'>
                                            <Label>File FOrmat:</Label>
                                            <CustomFormField
                                                fieldType={FormFieldType.RADIOGROUP}
                                                name={"importForm"}
                                                control={control}
                                                selectOptions={[
                                                    { label: "Export as csv ", value: "csv" },
                                                    { label: "Export as xml", value: "xml" },
                                                ]}
                                            />
                                        </div>

                                        <CustomFormField
                                            fieldType={FormFieldType.CHECKBOX}
                                            name={"updateExisting"}
                                            control={control}
                                            placeholder='Save export to the server for later download'
                                        />
                                    </SectionLayout>


                                    <ActionBarLayout>
                                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6 gap-2">Continue </Button>
                                    </ActionBarLayout>
                                </form>
                            </Form>

                        </>
                    }
                    {
                        activeTab === 'export_preview' &&
                        <Previewtable />
                    }
                </TabsContent>

            </Tabs>


        </div >
    )
}

export default ExportSKUs;



import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import useMediaQuery from '@/hooks/useMedia';

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

function Previewtable() {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
