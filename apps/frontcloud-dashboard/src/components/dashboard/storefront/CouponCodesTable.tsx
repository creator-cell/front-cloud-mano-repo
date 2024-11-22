"use client";

import React, { useState } from "react";
import {
    ColumnDef,
    SortingState,
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCheck, CirclePlus, CircleX, Ellipsis, PenLineIcon, SquareChartGantt, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionLayout from "@/components/common/CommonSectionLayout";
import Link from "next/link";
import { Coupon } from "@/store/api/storefront/types";

interface CouponTableProps {
    data: Coupon[];
}

const CouponTable: React.FC<CouponTableProps> = ({ data }) => {
    console.log("🚀 ~ CouponTable ~ data:", data);

    const initialColumns: ColumnDef<Coupon>[] = [
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
            accessorKey: "CouponName",
            header: "Coupon Name",
        },
        {
            accessorKey: "CouponCode",
            header: "Coupon Code",
        },
        {
            accessorKey: "Discount",
            header: "Discount",
        },
        {
            accessorKey: "ExpireDate",
            header: "Expiration",
            cell: ({ row }) => new Date(row.original.ExpireDate).toLocaleDateString(),
        },
        {
            accessorKey: "Enabled",
            header: "Enabled",
            cell: ({ row }) => (
                row.original.Enabled ? (
                    <CheckCheck size={20} color="green" />
                ) : (
                    <CircleX size={20} color="red" />
                )
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Ellipsis size={20} color="green" className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <SquareChartGantt className="mr-2 h-4 w-4" />
                                <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <PenLineIcon className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const columns = React.useMemo(() => initialColumns, []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <SectionLayout className="px-4 rounded-md">
            <div className="flex items-center gap-x-5">
                <Button asChild>
                    <Link href="/dashboard/marketing/cupon-codes/create">
                        <CirclePlus size={20} color="white" className="mr-2" />
                        <span>Add Coupon</span>
                    </Link>
                </Button>
                <Button>
                    <Trash2 size={20} color="white" />
                </Button>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No coupons available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </SectionLayout>
    );
};

export default CouponTable;

