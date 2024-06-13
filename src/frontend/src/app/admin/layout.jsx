"use client"
import { useState } from 'react';
import Link from "next/link";



export default function Layout({ children }) {
  return (
    <>
      <div style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/dupic.png)' }} className="h-12 relative w-full flex gap-2 bg-gray-500">
        <div className="sticky top-0 flex-1 h-full text-white flex justify-center items-center gap-10 text-lg font-semibold italic">
          <Link href="/admin/">Home</Link>
          <Link href="/admin/application_received">Application Received</Link>
          <Link href="/admin/message">Message Recived</Link>
          <Link href="/admin/seat-management">Seat Management</Link>
          {/* <div className="group h-full relative flex flex-col items-center">
            <div className="h-full flex justify-center items-center">
              Seat Details
            </div>
            <div className="absolute group-hover:h-20 hover:h-20 h-0 w-40 overflow-hidden px-2 bg-gray-500 top-12 flex flex-col *:w-full *:flex-1 *:flex *:items-center text-sm">
              <Link href="/admin/seats" className=''>Seats</Link>
              <Link href="/admin/allocated_seats" className=''>Allocated Seats</Link>
              <Link href="/admin/empty_seats" className=''>Empty Seats</Link>
            </div>
          </div> */}
          <div className="group h-full relative flex flex-col items-center ">
            <div className="h-full flex justify-center items-center">
              Manage Admin
            </div>
            <div className="absolute group-hover:h-16 hover:h-16 h-0 w-40 overflow-hidden px-2 bg-gray-500 top-12 flex flex-col *:w-full *:flex-1 *:flex *:items-center text-sm">
              <Link href="/admin/add_seats" className=''>Appoint Admin</Link>
              <Link href="/admin/remove_seat" className=''>Remove Admin</Link>
              {/* <Link href="/admin/add_new_room" className=''>Add new room</Link>
              <Link href="/admin/add_new_building" className=''>Add new Building</Link>
              <Link href="/admin/remove_seat" className=''>Remove seat</Link>
              <Link href="/admin/remove_room" className=''>Remove Room</Link>
              <Link href="/admin/remove_building" className=''>Remove building</Link> */}
            </div>
          </div>
          <div className="group h-full relative flex flex-col items-center ">
            <div className="h-full flex justify-center items-center">
              Update capacity
            </div>
            <div className="absolute group-hover:h-16 hover:h-16 h-0 w-40 overflow-hidden px-2 bg-gray-500 top-12 flex flex-col *:w-full *:flex-1 *:flex *:items-center text-sm">
              <Link href="/admin/add_seats" className=''>Add new Seat</Link>
              <Link href="/admin/remove_seat" className=''>Remove seat</Link>
              {/* <Link href="/admin/add_new_room" className=''>Add new room</Link>
              <Link href="/admin/add_new_building" className=''>Add new Building</Link>
              <Link href="/admin/remove_seat" className=''>Remove seat</Link>
              <Link href="/admin/remove_room" className=''>Remove Room</Link>
              <Link href="/admin/remove_building" className=''>Remove building</Link> */}
            </div>
          </div>

        </div>

        <div className="w-40 h-full flex items-center gap-2 pr-2">
          <Link href="/student/profile" className="h-2/3 aspect-square rounded-full overflow-hidden">
            <img src="/c.jpg" alt="" className="w-full h-full object-cover" />
          </Link>
          <div className="h-2/3 flex-1 bg-red-500 text-white rounded-sm flex items-center justify-center">Logout</div>
        </div>
      </div>
      {children}
    </>
  );
}