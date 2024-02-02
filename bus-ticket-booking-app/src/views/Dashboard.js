// src/views/Dashboard.js
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

const Dashboard = () => {
  // Retrieve reservation details from localStorage
  const storedReservationDetails = JSON.parse(localStorage.getItem('reservationDetails')) || {};
  const [reservationDetails, setReservationDetails] = useState(storedReservationDetails);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    // Update the reservation details in localStorage
    localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    // Delete the reservation details from localStorage
    localStorage.removeItem('reservationDetails');
    setReservationDetails({});
  };

  return (
    <div>
      <NavigationBar />
      <h2>Passenger Dashboard</h2>
      <div>
      {Object.keys(reservationDetails).length > 0 ? (
  <div>
    <h3>Reservation Details</h3>
    <p>
      <strong>First Name:</strong>{' '}
      {isEditing ? (
        <input
          type="text"
          name="firstName"
          value={reservationDetails.firstName || ''}
          onChange={handleInputChange}
        />
      ) : (
        reservationDetails.firstName
      )}
    </p>
    <p>
      <strong>Last Name:</strong>{' '}
      {isEditing ? (
        <input
          type="text"
          name="lastName"
          value={reservationDetails.lastName || ''}
          onChange={handleInputChange}
        />
      ) : (
        reservationDetails.lastName
      )}
    </p>
    <p>
      <strong>Email:</strong>{' '}
      {isEditing ? (
        <input
          type="text"
          name="email"
          value={reservationDetails.email || ''}
          onChange={handleInputChange}
        />
      ) : (
        reservationDetails.email
      )}
    </p>
    <p>
      <strong>Seat Number:</strong> {reservationDetails.seatNumber}
    </p>
    <p>
      <strong>Date of Booking:</strong> {reservationDetails.dateOfBooking}
    </p>
    {isEditing ? (
      <button onClick={handleSaveClick}>Save</button>
    ) : (
      <button onClick={handleEditClick}>Edit</button>
    )}
    <button onClick={handleDeleteClick}>Delete</button>
  </div>
) : (
  <p>No reservation details found.</p>
)}
      </div>
    </div>
  );
};

export default Dashboard;
