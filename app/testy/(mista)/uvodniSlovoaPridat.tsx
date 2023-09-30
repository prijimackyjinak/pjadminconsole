"use client"

import {useState} from "react";
import PocketBase from "pocketbase";
import {revalidatePath} from "next/cache";

export default function UvodniSlovoaPridat(){
    const [mesto,setMesto] = useState("")
    const [ulice,setUlice] = useState("")
    const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');
    const handleCreate = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        try {
            const dataForCreation = {
                "Mesto":mesto,
                "Ulice":ulice,
            }
            await pb.collection('pobocky_testu').create(dataForCreation);
            revalidatePath("/testy")
        } catch (e) {
            console.log(e)
        }
    }
    return(
        <>
        <div className="container max-w-6xl mx-auto px-8 ">
            <h1 className="text-2xl font-medium">
                Přehled poboček testů
            </h1>
            <form className="flex flex-col" onSubmit={handleCreate}>
                <div className="flex flex-row justify-between">
                    <div className="">Přidat novou lokaci</div>
                    <button className="bg-gray-200 rounded-lg px-4 py-1 text-gray-600 border-gray-400 border" type="submit">Zveřejnit</button>

                </div>

                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row max-w-xl w-full justify-between">
                        <p>Město</p>
                        <input type="text" onChange={e => setMesto(e.target.value)} className="border rounded-md" />
                    </div>
                    <div className="flex flex-row max-w-xl w-full justify-between">
                        <p>Adresa</p>
                        <input type="text" onChange={e => setUlice(e.target.value)} className="border rounded-md" />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}