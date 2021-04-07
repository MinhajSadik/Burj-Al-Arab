import { lighten } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5000/booking?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setBooking(data));
        
    }, [])
    return (
        <div>
            <h3>You Have: {booking.length} Bookings</h3>
            {
                booking.map(book =>
                    <li>{book.name}
                    ==from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))}
                    ==to:{(new Date(book.checkOut).toDateString('dd/MM/yyyy'))} </li>)
            }
        </div>
    );
};

export default Booking;