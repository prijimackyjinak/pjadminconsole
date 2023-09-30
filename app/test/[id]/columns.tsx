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
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Zakaznik = {
    id: string
    email:string
    jmeno:string
    prijimeni:string
    trida:string
}

export const columns: ColumnDef<Zakaznik>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "jmeno",
        header: "Jméno",
    },
    {
        accessorKey: "prijimeni",
        header: "Přijímení",
    },
    {
        accessorKey: "trida",
        header: "Třída",
    },
    {
        accessorKey: "id",
        header: "Id",
    },

]
