import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {columns, Test} from "@/app/testy/columns";
import {DataTable} from "@/app/testy/data-table";
import {kurzColumns,Kurz} from "@/app/testy/(kurzy-table)/columns";
import PocketBase from 'pocketbase';
import {KurzyTable} from "@/app/testy/(kurzy-table)/kurzy-table";
import UvodniSlovoKurz from "@/app/(kurz)/uvodniSlovo";
export const fetchCache = 'default-no-store'
export const revalidate = 0;
export const dynamic = 'force-dynamic'
async function getData(): Promise<Test[]>{
    const pb = new PocketBase('https://pocketbase-production-9753.up.railway.app');
    const records = await pb.collection('price_item_test').getFullList({
        sort: '-created',
        expand: 'zakaznici',
    });
    const isArchived = (archivedStatusData:any) => {
        if(archivedStatusData === true){
            return("archivováno")
        }else{
            return("zveřejněno")
        }
    }
    console.log(records)
    const DateFormatter = (dateString:any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleDateString("cs-CZ",{month:"long"})
        const day = date.getDate();
        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate
    }
    const preData = records.filter(item => item.kurz !== true)
    const preDataKurz = records.filter(item => item.kurz === true)
    const dataKurz:Array<Kurz> = preDataKurz.map((item:any)=>({
        id:item.id,
        title:item.nazevKurzu,
        zakaznici:item.zakaznici.length,
    }))
    const data:Array<Test> = preData.map((item:any)=>({
        id:item.id,
        datum:DateFormatter(item.datum),
        status: isArchived(item.archived),
        zakaznici: item.zakaznici.length,
        mesto: item.misto_konani,
        fullPrice:item.fullprice
    }))
    // @ts-ignore
    return ({"data":data,"kurzData":dataKurz})
}
export default async function TestyTable() {
    const data = await getData()
    // @ts-ignore
    const dataTest = data["data"]
    // @ts-ignore
    const dataKurz = data["kurzData"]

    return (
        <div>
            <div className="container max-w-6xl mx-auto px-8">
                <DataTable columns={columns} data={dataTest} />
            </div>
            <div className="py-10">
                <UvodniSlovoKurz />
            </div>
            <div className="container max-w-6xl mx-auto px-8">
                <KurzyTable columns={kurzColumns} data={dataKurz} />
            </div>
        </div>

    )
}