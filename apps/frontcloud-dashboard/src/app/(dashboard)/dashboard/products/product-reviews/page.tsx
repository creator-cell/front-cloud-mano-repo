"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";


import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import CommonDataTable from "@/components/common/CommonDataTable";
import { CustomHeading } from "@/components/custom/CustomHeading";
import { CustomParagraph } from "@/components/custom/CustomParagraph";
import Rating from "@/components/common/CommonRating";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";

type Product = {
    id: string;
    product: string;
    rating: number;
    postedBy: string;
    date: string;
    status: "pending" | "approved" | "rejected";
};

const data: Product[] = [
    {
        id: "1",
        product: "Product A",
        rating: 4.5,
        postedBy: "User1",
        date: "2024-09-01",
        status: "approved",
    },
    {
        id: "2",
        product: "Product B",
        rating: 3.8,
        postedBy: "User2",
        date: "2024-09-02",
        status: "pending",
    },
    {
        id: "3",
        product: "Product C",
        rating: 4.0,
        postedBy: "User3",
        date: "2024-09-03",
        status: "rejected",
    },
    // Add more rows as needed
];

const columns: ColumnDef<Product>[] = [
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
        accessorKey: "product",
        header: () => <div>Product</div>,
        cell: ({ row }) => <div>{row.getValue("product")}</div>,
    },
    {
        accessorKey: "rating",
        header: () => <div className="text-left">Rating</div>,
        cell: ({ row }) => (
            <div className="">
                < Rating rating={row.getValue("rating")} />

            </div>
        ),
    },
    {
        accessorKey: "postedBy",
        header: "Posted By",
        cell: ({ row }) => <div>{row.getValue("postedBy")}</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                // onClick={() => row.column.toggleSorting(row.column.getIsSorted() === "asc")}

                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
const ProductReviews = () => {

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

    const handleDelete = () => {
        console.log("Delete")
    }

    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>View Product Reviews</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>When someone writes a review for a product from your site it will appear in the list below.</CustomParagraph>
            </div>
            <div className="bg-white px-5 py-4 rounded-sm">
                <CommonDataTable
                    data={data}
                    columns={columns}
                    table={table}
                    topClassName='gap-x-4'
                    tableSearchKeys={['categoryName']}
                    searchPlaceholder='Search for Categories'
                >
                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected Review will be removed permanently. If the Review appear in any Product Pick List options they will also be removed from those options. Are you sure?'
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

export default ProductReviews
