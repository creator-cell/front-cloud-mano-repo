"use client";
import React, { useRef } from 'react'
import PageWrapper from '../../_components/PageWrapper'
import MultiDataViewTable from '@/components/common/MultiDataViewTable'

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowUpDown, CirclePlus, MoreHorizontal, PencilIcon, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { Input } from '@/components/ui/input';


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

export type User = {
    id: string;
    email: string;
    role: string;
    status: string;
};

const data: User[] = [
    {
        id: "user1",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: "user2",
        email: "jane.smith@example.com",
        role: "Editor",
        status: "Inactive",
    },
    {
        id: "user3",
        email: "michael.jordan@example.com",
        role: "Viewer",
        status: "Pending",
    },
];

const columns: ColumnDef<User>[] = [
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
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "role",
        header: "User Role",
        cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex items-center justify-start gap-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];

const UsersPage = () => {

    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })



    const handleDelete = () => {
    }
    return (
        <PageWrapper >
            <div className='bg-white p-6 rounded-sm'>

                <MultiDataViewTable
                    columns={columns}
                    data={data}
                    tableInstance={table}
                >
                    <Button>
                        <CirclePlus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>

                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected products will be removed permanently. If the products appear in any Product Pick List options they will also be removed from those options. Are you sure?'
                        confirmLabel='Delete'
                        cancelLabel='Cancle'
                        onConfirm={handleDelete}
                        isDisabled={table.getSelectedRowModel().rows.length < 1}
                        triggerLabel={<Trash2 className="h-4 w-4  " />}
                        diasbledMessage='Select At least one product'
                    />

                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                </MultiDataViewTable>
            </div>
        </PageWrapper>
    );
};

export default UsersPage;
