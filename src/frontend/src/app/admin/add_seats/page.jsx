"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddNewSeat() {
  const [seatNumber, setSeatNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/seats', {
        seatNumber,
        roomNumber,
        floorNumber,
        buildingName,
        status
      });
      console.log('Seat added successfully:', response.data);
      toast.success("Succesfully Added Seat")
      // Clear the form
      setSeatNumber('');
      setRoomNumber('');
      setFloorNumber('');
      setBuildingName('');
      setStatus('Available');
    } catch (error) {
      toast.error('Error adding seat:', error);
      console.error('Error adding seat:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Add New Seat</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Seat Number</label>
          <select 
            value={seatNumber} 
            onChange={(e) => setSeatNumber(e.target.value)} 
            className="w-full px-3 py-2 border rounded"
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
          <label className="block text-gray-700">Floor Number</label>
          <input 
            type="number" 
            value={floorNumber} 
            onChange={(e) => setFloorNumber(e.target.value)} 
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
          >
            <option value="">Select Building</option>
            <option value="Rafiq">Rafiq Bhavan</option>
            <option value="Salam">Salam Bhavan</option>
            <option value="Barkat">Barkat Bhavan</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select 
            disabled
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded">Add Seat</button>
      </form>
    </div>
  );
}

export default AddNewSeat;
