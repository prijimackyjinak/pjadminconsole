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
export type Misto = {
    mesto: string
    adresa: string
}

export const columns: ColumnDef<Misto>[] = [
    {
        accessorKey: "mesto",
        header: "Město",
    },
    {
        accessorKey: "adresa",
        header: "Adresa",
    },
]
