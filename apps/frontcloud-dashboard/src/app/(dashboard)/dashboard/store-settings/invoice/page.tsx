"use client";
import React from 'react'
import PageWrapper from '../../_components/PageWrapper'
import MultiDataViewTable from '@/components/common/MultiDataViewTable'
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define the Invoice type
export type Invoice = {
    invoiceNumber: string;
    status: string;
    invoicedOn: string;
    totalUSD: string;
    amountDueUSD: string;
};

const data: Invoice[] = [
    {
        invoiceNumber: "INV-001",
        status: "Paid",
        invoicedOn: "2024-09-01",
        totalUSD: "$500.00",
        amountDueUSD: "$0.00",
    },
    {
        invoiceNumber: "INV-002",
        status: "Unpaid",
        invoicedOn: "2024-09-05",
        totalUSD: "$750.00",
        amountDueUSD: "$750.00",
    },
    {
        invoiceNumber: "INV-003",
        status: "Partially Paid",
        invoicedOn: "2024-09-10",
        totalUSD: "$1,000.00",
        amountDueUSD: "$250.00",
    },
];

const invoiceColumns: ColumnDef<Invoice>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "invoiceNumber",
        header: "Invoice #",
        cell: ({ row }) => <div>{row.getValue("invoiceNumber")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{
            row.getValue("status") === "Paid" ? <Badge className="bg-green-500">Paid</Badge> : <Badge className="bg-red-500">Unpaid</Badge>
        }</div>,
    },
    {
        accessorKey: "invoicedOn",
        header: "Invoiced On",
        cell: ({ row }) => <div>{row.getValue("invoicedOn")}</div>,
    },
    {
        accessorKey: "totalUSD",
        header: "Total (USD)",
        cell: ({ row }) => <div>{row.getValue("totalUSD")}</div>,
    },
    {
        accessorKey: "amountDueUSD",
        header: "Amount Due (USD)",
        cell: ({ row }) => <div>{row.getValue("amountDueUSD")}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => (
            <Download
                className="w-6 h-6 text-primary cursor-pointer hover:text-opacity-60"
                onClick={() => { }}
            />
        ),
    },
];


const Invoice = () => {

    const handleDelete = () => {
    }
    return (
        <PageWrapper >
            <div className='bg-white p-6 rounded-sm'>

                <MultiDataViewTable
                    columns={invoiceColumns}
                    data={data}
                >
                    <Button variant={"outline"} className="flex items-center text-primary ring-1 ring-primary hover:text-primary capitalize mb-1 gap-x-2 ">
                        paying a unpaid Invoice
                    </Button>

                </MultiDataViewTable>
            </div>
        </PageWrapper>
    );
};

export default Invoice;
