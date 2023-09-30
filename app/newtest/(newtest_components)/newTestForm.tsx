export default function NewTestForm(){
    return(
        <div className="px-4">
            <div className="">
                <h1>Nový test</h1>
            </div>
            <form className="">
                <div className="flex flex-col w-fit">
                    <p className="text-lg font-semibold">Datum</p>
                    <input type="date" />
                </div>
            </form>
        </div>
    )
}