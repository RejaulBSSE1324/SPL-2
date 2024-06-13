export default function Page() {
    return(<>
    <div className="w-full h-screen flex flex-col">
        <div className="w-full flex-1 flex justify-center items-center">
            <img src="/dupic.png" alt="" className="w-full h-full object-cover"/>
            <div className="w-1/2 h-auto text-7xl text-gray-200 text-center font-semibold absolute z-10">
                Hall Seat Managemant System
            </div>
        </div>
        <div className="h-8 w-full bg-gray-800 text-white text-sm flex justify-center items-center">copyright: BSSE1324 & BSSE1355</div>
        <div className="w-full h-12"></div>
    </div>
    </>)
}