// src/views/Reservation.js

// src/views/Reservation.js
import './Reservation.css';
// src/views/Reservation.js
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

const Reservation = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  // const handleReservationSubmit = (e) => {
  //   e.preventDefault();
  //   // Implement your reservation logic here, e.g., send a request to a server

  //   // Reset the form after submitting
  //   setSelectedSeat(null);
  //   setFirstName('');
  //   setLastName('');
  //   setEmail('');
  // };
  const handleReservationSubmit = (e) => {
    e.preventDefault();

    // Store the reservation details in localStorage
    const reservationDetails = {
      firstName,
      lastName,
      email,
      seatNumber: selectedSeat,
      dateOfBooking: new Date().toLocaleDateString(), // Store the current date
    };

    localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));

    // Reset the form after submitting
    setSelectedSeat(null);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  // Create a function to generate the bus layout
  const generateBusLayout = () => {
    const lowerDeckRows = 3;
    const upperDeckRows = 3;
    var seatsPerRow = 7;
    const totalLowerDeckSeats = lowerDeckRows * seatsPerRow - 1;
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || {};
    const lowerDeck = [];
    const upperDeck = [];
    console.log("heloo>>", reservedSeats)
    // const generateRow = (deck, deckNumber, rowNumber, maxSeats) => {

    //   for (let seatNumber = 1; seatNumber <= maxSeats; seatNumber++) {

    //     const seatId = (deckNumber - 1) * totalLowerDeckSeats + (rowNumber - 1) * seatsPerRow + seatNumber;
    //     const isSeatSelected = selectedSeat === seatId;
    //     const isSeatReserved = reservedSeats[seatId];
    //     const displaySeatNumber = (deckNumber - 1) * totalLowerDeckSeats + (rowNumber - 1) * seatsPerRow + seatNumber;
    //     console.log("heloo1>>", reservedSeats)
    //     // const seatClassName = `seat ${
    //     //   isSeatSelected || reservedSeats[seatId] ? 'selected' : ''
    //     // }`;
    //     const seatClassName = `seat ${isSeatSelected ? 'selected' : ''} ${isSeatReserved ? 'reserved' : ''}`;
    //     // deck.push(
    //     //   <div
    //     //     key={seatId}
    //     //     className={seatClassName}
    //     //     onClick={() => handleSeatSelect(seatId)}
    //     //     disabled={reservedSeats[seatId]}

    //     //   >
    //     //     {displaySeatNumber}
    //     //   </div>
    //     // )
    //     deck.push(
    //       <div
    //         key={seatId}
    //         className={seatClassName}
    //         onClick={() => (isSeatReserved ? null : handleSeatSelect(seatId))}
    //         disabled={isSeatReserved}
    //       >
    //         {displaySeatNumber}
    //       </div>
    //     );
    //   }
    // };
    const generateRow = (deck, deckNumber, rowNumber, maxSeats) => {
      for (let seatNumber = 1; seatNumber <= maxSeats; seatNumber++) {
        const seatId = (deckNumber === 1 ? 0 : totalLowerDeckSeats) + (rowNumber - 1) * seatsPerRow + seatNumber;
        const isSeatSelected = selectedSeat === seatId;
    
        // Fetch reserved seats from local storage and handle the case when it's null or undefined
        const reservedSeats = JSON.parse(localStorage.getItem('reservationDetails')) || {};
        const isSeatReserved = reservedSeats && reservedSeats.seatNumber === seatId;
    console.log("hello1",isSeatReserved,reservedSeats)
        const displaySeatNumber = (deckNumber - 1) * totalLowerDeckSeats + (rowNumber - 1) * seatsPerRow + seatNumber;
    
        const seatClassName = `seat ${isSeatSelected ? 'selected' : ''} ${isSeatReserved ? 'reserved' : ''}`;
    
        deck.push(
          <div
            key={seatId}
            className={seatClassName}
            onClick={() => (isSeatReserved ? null : handleSeatSelect(seatId))}
            disabled={isSeatReserved}
          >
            {displaySeatNumber}
          </div>
        );
      }
    };
    
    
    generateRow(lowerDeck, 1, 1, 7);
    generateRow(lowerDeck, 1, 2, 7);
    generateRow(lowerDeck, 1, 3, 6);


    generateRow(upperDeck, 2, 1, 7);
    generateRow(upperDeck, 2, 2, 7);
    generateRow(upperDeck, 2, 3, 6);

    return (
      <div>
        <div className="instruction-box">
          <p className="instruction-label">Click on an available seat to proceed with the transaction</p>
        </div>
        <div className="deck lower-deck">
          <div className="deck-outline">
            <h3>Lower Deck</h3>
            <div className="bus-layout">{lowerDeck}</div>
          </div>
        </div>
        <div className="deck upper-deck">
          <div className="deck-outline">
            <h3>Upper Deck</h3>
            <div className="bus-layout">{upperDeck}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavigationBar />
      <h2>Bus Reservation</h2>
      {generateBusLayout()}
      <form onSubmit={handleReservationSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default Reservation;
