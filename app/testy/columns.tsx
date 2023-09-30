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
export type Test = {
    id: string
    status: "zveřejněno" | "archivováno"
    datum:string
    zakaznici: number
    mesto: string
}

export const columns: ColumnDef<Test>[] = [
    {
        accessorKey: "datum",
        header: "Datum",
    },
    {
        accessorKey: "mesto",
        header: "Město",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "id",
        header:"id",
        cell: ({ row }) => <a href={"/test/"+row.getValue("id")}>{row.getValue("id")}</a>
    },

    {
        accessorKey: "zakaznici",
        header: "Počet přihlášených",
    },
]
