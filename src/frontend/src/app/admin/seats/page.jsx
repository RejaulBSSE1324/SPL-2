"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminSeats() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/seats');
        console.log('Fetched seat data:', response.data);  // Debugging log
        if (Array.isArray(response.data)) {
          setSeats(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchSeatData();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'center',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '12px',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };
  const headingStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const trStyle = {
    borderBottom: '1px solid #ddd',
  };

  return (
    <div>
      <h1 style={headingStyle} className='p-5' >Seat List</h1>
      <table style={tableStyle}>
        <thead>
          <tr style={trStyle}>
            <th style={thStyle}>Seat Number</th>
            <th style={thStyle}>Room Number</th>
            <th style={thStyle}>Floor Number</th>
            <th style={thStyle}>Building Name</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(seats) && seats.map((seat, index) => (
            <tr key={index} style={trStyle}>
              <td style={tdStyle}>{seat.seatNumber}</td>
              <td style={tdStyle}>{seat.roomNumber}</td>
              <td style={tdStyle}>{seat.floorNumber}</td>
              <td style={tdStyle}>{seat.buildingName}</td>
              <td style={tdStyle}>{seat.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSeats;
