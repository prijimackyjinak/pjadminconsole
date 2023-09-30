"use client"
import PocketBase from 'pocketbase';
import {useState} from "react";
import { revalidatePath } from 'next/cache'
interface misto{
    mesto:string;
    ulice:string;
}
interface mistoNove{
    mesto:string;
    ulice:string;
    picked:boolean;
}
export default function CreateNewTest({mista}:{mista:Array<misto>}){
    const [date,setDate] = useState("")
    const newMistaArray: Array<mistoNove> = mista.map(obj => ({
        ...obj,
        picked:false
    }))
    const [newMista, setNewMista] = useState(newMistaArray)
    const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');
    const handleCreate = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        try {
            for (let i = 0; i < newMista.length; i++){
                const initDataFull = {
                    "datum":date,
                    "cena":690,
                    "archived":false,
                    "stripe_price_id":"price_1NeFOOAcA2ax2Nq6kbQxDvsY",
                    "fullprice":true,
                    "misto_konani":newMista[i].mesto,
                }
                const initDataBudget = {
                    "datum":date,
                    "cena":490,
                    "archived":false,
                    "stripe_price_id":"price_1NoUd9AcA2ax2Nq6H1ZOQJXy",
                    "fullprice":false,
                    "misto_konani":newMista[i].mesto,
                }
                if (newMista[i].picked){
                    await pb.collection('price_item_test').create(initDataFull);
                    await pb.collection('price_item_test').create(initDataBudget);
                }
            }
            revalidatePath("/testy")

        } catch (e) {
            console.log(e)
        }
    }
    const handlePickMisto = (key:string): Array<mistoNove> => {
        return newMista.map(obj => {
            if(obj.mesto === key){
                return {
                    ...obj,
                    picked: !obj.picked
                };
            }
            return obj;
        })
    }
    return(
        <div className="max-w-6xl mx-auto px-8">
            <form className="flex flex-row justify-between">
                <div className="">Přidat nový test</div>
                <input type="date" onChange={e => setDate(e.target.value)} />
                {newMista.map((item)=>(
                    <div>
                        {item.mesto}
                        {item.picked ?
                            <div>
                                <input type="checkbox" onClick={()=> setNewMista(handlePickMisto(item.mesto))} ></input>
                            </div>:
                            <div>
                                <input type="checkbox" onClick={()=> setNewMista(handlePickMisto(item.mesto))}></input>

                            </div>
                        }
                    </div>
                ))}
                <button className="bg-gray-200 rounded-lg px-4 py-1 text-gray-600 border-gray-400 border" onClick={handleCreate}>Zveřejnit</button>
            </form>
        </div>
    )
}