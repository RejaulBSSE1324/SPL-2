import Link from "next/link";
import { Logout } from "./profile/page";


export default function Layout({ children }) {
  
  return (
    <>
      <div style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/dupic.png)' }} className="h-12 relative w-full flex gap-2 bg-gray-500">
        <div className="sticky top-0 flex-1 h-full text-white flex justify-center items-center gap-10 text-lg font-semibold italic">
          <Link href="/student/">Home</Link>
          <Link href="/student/application_form">Apply For Seat</Link>
          <Link href="/student/contact" >Contact</Link>
          {/* <Link href="/student/message">Message Recived</Link> */}
        </div>

        <div className="w-40 h-full flex items-center gap-2 pr-2">
          <Link href="/student/profile" className="h-2/3 aspect-square rounded-full overflow-hidden">
            <img src="/c.jpg" alt="" className="w-full h-full object-cover "/>
          </Link>
          <Logout></Logout>
        </div>
      </div>
      {children}
    </>
  );
}