// components/AllocatedSeat.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AllocatedSeat = ({ seat }) => {
  // Destructure seat data
  const { seatNumber, roomNumber, floorNumber, buildingName } = seat;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Allocated Seat Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Seat Number:</label>
          <p className="text-gray-700 text-base">{seatNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Room Number:</label>
          <p className="text-gray-700 text-base">{roomNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Floor Number:</label>
          <p className="text-gray-700 text-base">{floorNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Building Name:</label>
          <p className="text-gray-700 text-base">{buildingName}</p>
        </div>
        <div className="flex items-center justify-between">
          <Link href="/student/profile">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Profile</a>
          </Link>
          <Link href="/student/logout">
            <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllocatedSeat;
