'use client';
import React, { useState } from 'react'


import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, PencilLine, Settings, Trash2 } from "lucide-react"



import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CommonDataTable from '@/components/common/CommonDataTable'
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import Link from 'next/link';

export type Brand = {
    id: string
    brandName: string
    products: number
    action: string
}

const data: Brand[] = [
    {
        id: "1",
        brandName: "Electronics",
        products: 120,
        action: "Edit",
    },
    {
        id: "2",
        brandName: "Clothing",
        products: 200,
        action: "Edit",
    },
]


const columns: ColumnDef<Brand>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "brandName",
        header: "Brand Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("brandName")}</div>
        ),
    },

    {
        accessorKey: "products",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase items-center flex justify-center">{row.getValue("products")}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <Link href={"/dashboard/products/brands/edit"}>
                    <PencilLine size={20} color='green' />
                </Link>
            )
        },
    },
]


const Brands = () => {


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const router = useRouter()

    const handleDelete = () => {
        console.log('Delete')
    }

    const [brandInput, setBrandInput] = useState<string>("")
    const [brands, setBrands] = useState<string[]>([])

    const handleAddBrand = () => {
        if (brandInput.trim() !== "") {
            setBrands([...brands, brandInput.trim()])
            setBrandInput("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddBrand()
        }
    }

    const removeBrand = (brandToRemove: string) => {
        setBrands(brands.filter(brand => brand !== brandToRemove))
    }


    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>View Brands</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Brands can be associated with products, allowing your customers to shop by browsing their favorite brands.</CustomParagraph>
            </div>
            <div className='bg-white px-4 pb-8 rounded-sm '>
                <CommonDataTable
                    data={data}
                    columns={columns}
                    table={table}
                    topClassName='gap-x-4'
                    tableSearchKeys={['categoryName']}
                    searchPlaceholder='Search for Categories'
                >
                    <Button className='' onClick={() => router.push('/dashboard/products/brands/edit')}>Add New Brand</Button>
                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected Brands will be removed permanently. If the Brand appear in any Product Pick List options they will also be removed from those options. Are you sure?'
                        confirmLabel='Delete'
                        cancelLabel='Cancle'
                        onConfirm={handleDelete}
                        isDisabled={table.getSelectedRowModel().rows.length < 1}
                        triggerLabel={<Trash2 className="h-4 w-4  " />}
                        diasbledMessage='Select At least one Brand'

                    />

                </CommonDataTable>
            </div>

        </div>
    )
}

export default Brands


