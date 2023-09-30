"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreHorizontal} from '../../node_modules/lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Kurz = {
    id: string
    zakaznici: number
    title:string
}

export const kurzColumns: ColumnDef<Kurz>[] = [

    {
        accessorKey: "title",
        header: "Název kurzu",
    },
    {
        accessorKey: "id",
        header:"id",
        cell: ({ row }) => <a href={"/kurz/"+row.getValue("id")}>{row.getValue("id")}</a>
    },

    {
        accessorKey: "zakaznici",
        header: "Počet přihlášených",
    },
]
