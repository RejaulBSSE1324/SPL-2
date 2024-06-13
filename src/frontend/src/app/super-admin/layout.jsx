"use client"
import { useState } from 'react';
import Link from "next/link";



export default function Layout({ children }) {
  return (
    <>
      <div className="h-12 w-full flex gap-2 bg-gray-500">
        <div className="flex-1 h-full text-white flex justify-center items-center gap-10 text-lg font-semibold italic">
          <Link href="/super_admin/">Home</Link>
          <Link href="/super_admin/application_form">set priority</Link>
          <Link href="/super_admin/message">Message Recived</Link>
          <div className="group h-full relative flex flex-col items-center">
            <div className="h-full flex justify-center items-center">
              Seat Details
            </div>
              <div className="absolute group-hover:h-20 hover:h-20 h-0 w-40 overflow-hidden px-2 bg-gray-500 top-12 flex flex-col *:w-full *:flex-1 *:flex *:items-center text-sm">
                <Link href="/super_admin/allocated_seats" className=''>Allocated Seats</Link>
                <Link href="/super_admin/empty_seats" className=''>Empty Seats</Link>
              </div>
          </div>
          <div className="group h-full relative flex flex-col items-center ">
            <div className="h-full flex justify-center items-center">
              Update capacity
            </div>
              <div className="absolute group-hover:h-40 hover:h-40 h-0 w-40 overflow-hidden px-2 bg-gray-500 top-12 flex flex-col *:w-full *:flex-1 *:flex *:items-center text-sm">
                <Link href="/super_admin/add_new_seat" className=''>Add new Seat</Link>
                <Link href="/super_admin/add_new_room" className=''>Add new room</Link>
                <Link href="/super_admin/add_new_building" className=''>Add new Building</Link>
                <Link href="/super_admin/remove_seat" className=''>Remove seat</Link>
                <Link href="/super_admin/remove_room" className=''>Remove Room</Link>
                <Link href="/super_admin/remove_building" className=''>Remove building</Link>
              </div>
          </div>

        </div>

        <div className="w-40 h-full flex items-center gap-2 pr-2">
          <Link href="/student/profile" className="h-2/3 aspect-square rounded-full overflow-hidden">
            <img src="/c.jpg" alt="" className="w-full h-full object-cover"/>
          </Link>
          <div className="h-2/3 flex-1 bg-red-500 text-white rounded-sm flex items-center justify-center">Logout</div>
        </div>
</div>
        {children}
      </>
      );
  }