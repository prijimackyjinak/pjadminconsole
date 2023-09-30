import UvodniSlovo from "@/app/testy/(testy-components)/UvodniSlovo";
import TestyTable from "@/app/testy/(testy-components)/TestyTable";
import CreateNewTest from "@/app/testy/(testy-components)/CreateNewTest";
import PocketBase from "pocketbase";
import UvodniSlovoaPridat from "@/app/testy/(mista)/uvodniSlovoaPridat";
export const fetchCache = 'default-no-store'
export const revalidate = 0;
export const dynamic = 'force-dynamic'
import {Misto, columns} from "@/app/testy/(mista)/columns";
import {DataTable} from "@/app/testy/data-table";
export default async function Testy(){
    const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');
    const record = await pb.collection("pobocky_testu").getFullList()
    const pobocky:Array<Misto> = record.map((item:any)=>({
        mesto:item.Mesto,
        adresa:item.Ulice,
    }))
    return(
        <div>
            <section className="pt-10">
                <UvodniSlovo />
            </section>
            <section className="pt-10">
                <CreateNewTest mista={pobocky} />
            </section>
            <section className="pt-10">
                <TestyTable />
            </section>
            <section className="pt-10">
                <UvodniSlovoaPridat />
            </section>
            <section className="container max-w-6xl mx-auto px-8 pt-10">
                <DataTable columns={columns} data={pobocky} />
            </section>
        </div>
    )
}