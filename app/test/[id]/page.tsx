import UvodniSlovoTest from "@/app/test/(test-components)/uvodniSlovo";
import PocketBase from "pocketbase";
import {columns, Zakaznik} from "@/app/test/[id]/columns";
import {DataTableZakaznici} from "@/app/test/[id]/data-table";
export default async function Page({ params }: { params: { id: string } }){
    interface ShortTest {
        datum:string;
        id:string
        archived:boolean;
    }
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


    const DateFormatter = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleDateString("cs-CZ",{month:"long"})
        const day = date.getDate();
        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate
    }
    const testZkraceny:ShortTest = {
        datum:DateFormatter(record.datum),
        archived:record.archived,
        id:record.id,
    }
    console.log(data)

    return(
        <div>
            <section className="pt-10">
                <UvodniSlovoTest datum={testZkraceny.datum} archived={testZkraceny.archived} id={testZkraceny.id} />
            </section>
            <section className="pt-10">
                <div className="container max-w-6xl mx-auto px-8">
                    <DataTableZakaznici columns={columns} data={data} />
                </div>
            </section>
        </div>
    )
}