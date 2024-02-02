// src/components/Passenger.js
import React, { useState } from 'react';

const Passenger = ({ id, name, email, seatNumber, dateOfBooking, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleSave = () => {
    onEdit(id, editedName, editedEmail);
    setIsEditing(false);
  };

  return (
    <div>
      <p>Name: {isEditing ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : name}</p>
      <p>Email: {isEditing ? <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /> : email}</p>
      <p>Seat Number: {seatNumber}</p>
      <p>Date of Booking: {dateOfBooking}</p>
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
      <hr />
    </div>
  );
};

export default Passenger;
