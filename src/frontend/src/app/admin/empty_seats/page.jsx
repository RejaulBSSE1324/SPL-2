"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AvailableSeats() {
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/seats');
        console.log('Fetched seat data:', response.data);  // Debugging log
        if (Array.isArray(response.data)) {
          // Filter seats with 'Available' status
          const availableSeats = response.data.filter(seat => seat.status === 'Available');
          setAvailableSeats(availableSeats);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchSeatData();
  }, []);

  const containerStyle = {
    textAlign: 'center',
  };

  const headingStyle = {
    fontWeight: 'bold',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'center', // Center-align all table content
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center', // Center-align header cells
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center', // Center-align data cells
  };

  const trStyle = {
    borderBottom: '1px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      <h6 style={headingStyle} className='p-5'>Available Seats</h6>
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
          {availableSeats.map((seat, index) => (
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

export default AvailableSeats;
