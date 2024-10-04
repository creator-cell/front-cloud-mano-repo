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
import React, { use, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const ExportCustomers = () => {

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
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'> Export customers</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>
                    Select an export template for your customers export or create a new export template. <Link href={"#"} className='text-blue-500 cursor-pointer'>create a new export template.</Link>
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
                                    <motion.div
                                        animate={{ width: isTablet ? "100vw" : state.sideBarOpen ? 'calc(100vw - 301px)' : 'calc(100vw - 61px)' }}
                                        className="flex items-center justify-end bg-white shadow-md px-4 py-2 gap-5 border-t-2 rounded-t-md border-gray-300   fixed bottom-0 right-0 w-full z-50">
                                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6 gap-2">Continue </Button>
                                    </motion.div>
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

export default ExportCustomers





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
import useMediaQuery from '@/hooks/useMedia';

const users = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        group: "Admin",
        orders: 12,
        dateJoined: "2024-01-15",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 987 654 321",
        group: "User",
        orders: 8,
        dateJoined: "2024-02-20",
    },
    {
        id: "3",
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "+1 456 789 123",
        group: "Moderator",
        orders: 15,
        dateJoined: "2024-03-10",
    },
    // Add more users as needed
];

function Previewtable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Date Joined</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.group}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell>{user.dateJoined}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
