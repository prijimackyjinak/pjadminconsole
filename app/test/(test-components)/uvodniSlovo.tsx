"use client"
import PocketBase from "pocketbase";
import {useState} from "react";

interface ShortTest {
    id:string;
    datum:string;
    archived:boolean;
}

export default function UvodniSlovoTest(test:ShortTest){
    const [archived,setArchived] = useState(test.archived)
    const  handleArchive = async () => {
        const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');

        try{
            await pb.collection('price_item_test').update(test.id,{archived:true})
            setArchived(true)
        }catch (e) {
            console.log(e)
        }

    }
    const  handleUnArchive = async () => {
        const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');

        try{
            await pb.collection('price_item_test').update(test.id,{archived:false})
            setArchived(false)
        }catch (e) {
            console.log(e)
        }

    }
    return(
        <div className="max-w-6xl mx-auto px-8">
            <div className="flex flex-row justify-between">
                <div className=" flex flex-row gap-x-5 text-2xl font-medium">
                    <p className="text-gray-700 font-normal">
                        Test
                    </p>
                    <p>
                        {test.datum}
                    </p>
                </div>
                {archived?(
                        <button className="bg-gray-200 rounded-lg px-4 py-1 text-gray-600 border-gray-400 border" onClick={handleUnArchive}>Zveřejnit</button>

                ):(
                        <button className="bg-gray-200 rounded-lg px-4 py-1 text-gray-600 border-gray-400 border" onClick={handleArchive}>Archivovat</button>
                )}
            </div>
        </div>
    )
}