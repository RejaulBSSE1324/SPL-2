"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function RemoveSeat() {
  const [seatNumber, setSeatNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the seat ID based on the provided details
      const fetchResponse = await axios.get('http://localhost:5555/seats/details', {
        params: {
          seatNumber,
          roomNumber,
          buildingName
        }
      });
  
      if (fetchResponse.data.length === 0) {
        toast.error('Seat not found with provided details');
        return;
      }
  
      const seatId = fetchResponse.data._id;
  
      // Delete the seat using the fetched ID
      const deleteResponse = await axios.delete(`http://localhost:5555/seats/${seatId}`);
      console.log('Seat removed successfully:', deleteResponse.data);
      toast.success('Successfully removed seat');
  
      // Clear the form
      setSeatNumber('');
      setRoomNumber('');
      setFloorNumber('');
      setBuildingName('');
    } catch (error) {
      console.error('Error removing seat:', error.response ? error.response.data : error.message);
      toast.error(`Error removing seat: ${error.response ? error.response.data.error : error.message}`);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Remove Seat</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Seat Number</label>
          <select 
            value={seatNumber} 
            onChange={(e) => setSeatNumber(e.target.value)} 
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Seat Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Number</label>
          <input 
            type="text" 
            value={roomNumber} 
            onChange={(e) => setRoomNumber(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Building Name</label>
          <select 
            value={buildingName} 
            onChange={(e) => setBuildingName(e.target.value)} 
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Building</option>
            <option value="Rafiq">Rafiq Bhavan</option>
            <option value="Salam">Salam Bhavan</option>
            <option value="Barkat">Barkat Bhavan</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-red-500 text-white px-3 py-2 rounded">Remove Seat</button>
      </form>
    </div>
  );
}

export default RemoveSeat;
