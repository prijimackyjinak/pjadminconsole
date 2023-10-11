import UvodniSlovoTest from "@/app/test/(test-components)/uvodniSlovo";
import PocketBase from "pocketbase";
import {columns, Zakaznik} from "@/app/test/[id]/columns";
import {DataTableZakaznici} from "@/app/test/[id]/data-table";

export default async function Page({ params }: { params: { id: string } }){
    const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');
    const record = await pb.collection('price_item_test').getOne(params.id, {
        expand: 'zakaznici',
    });
    const emptyData:Array<Zakaznik> = [{
        email:"...",
        jmeno:"...",
        prijimeni:"...",
        id:"...",
        trida:"...",
    },]

    const data:Array<Zakaznik> = record.expand.zakaznici ?
        record.expand.zakaznici.map((item:any)=>({
            email:item.email,
            jmeno:item.jmeno,
            prijimeni:item.prijmeni,
            id:item.id,
            trida:item.trida
        }))
        : emptyData


    return(
        <div>
            <section className="pt-10">
                <div className="max-w-6xl mx-auto px-8">
                    <h1 className="text-2xl font-medium">
                        Přehled zákazníků kurzu <span className="italic">{record.nazevKurzu}</span>
                    </h1>
                </div>
            </section>
            <section className="pt-10">
                <div className="container max-w-6xl mx-auto px-8">
                    <DataTableZakaznici columns={columns} data={data} />
                </div>
            </section>
        </div>
    )
}