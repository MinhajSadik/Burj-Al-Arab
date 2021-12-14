import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3100/booking?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h3>You Have: {booking.length} Bookings</h3>
      {booking.map((booking) => (
        <li key={booking._id}>
          {booking.name}
          ==from: {new Date(booking.checkIn).toDateString("dd/MM/yyyy")}
          ==to:{new Date(booking.checkOut).toDateString("dd/MM/yyyy")}{" "}
        </li>
      ))}
    </div>
  );
};

export default Booking;
