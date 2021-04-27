import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal2";
import { EventSeat } from "@material-ui/icons";
import StripeButton from "../../components/Stripe/StripeButton";
import axios from "axios";
import TwoPlusOne from "./twoplusone"
import TwoPlusTwo from "./twoplustwo"
function Seats({ user, history, location }) {
  const [state, setstate] = React.useState([]);
  const [seat, setSeat] = React.useState([]);
  const [dues, setdues] = React.useState([]);
  const [Bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    setstate(location.state);
    Update();
  }, []);



  const isBooked = (number) => {

    return Bookings.find((ticket) => ticket.seat === number);
  };
console.log("bookings",Bookings)
  const Update = async () => {
    let arr = [];

    try {
      let datas = await axios.get("http://localhost:3000/users/bookings", {
        params: { id: location.state.tripId },
      });
      const parseRes = datas.data;
      console.log("datas", parseRes);
      setBookings(parseRes.data);
    } catch (error) {}
  };
 
  const {
    arrivalIn,
    busId,
    departure,
    departureFrom,
    tripId,
    price,
    tv,
    wifi,
    foodService,
    busType
  } = state;
 
  return (
    <Grid
      className="fullw flex"
      column
      justify="center"
      alignItems="center"
      direction="column"
    >
   
    <div className="postCard row space-between ">
  <div className="row m1">
  <h2>{departureFrom}-</h2>
      <h2>{arrivalIn}</h2>
  </div>
      <h2 className="redbg m1">{price} tl</h2>
      <h2 className="purplebg m1">{busType} </h2>

    </div>
    <h2 className="blackButton w70">Koltuk seç</h2>
    {busType==="2+1"?(
       <TwoPlusOne isBooked={isBooked} seat={seat} setSeat={setSeat}></TwoPlusOne>
    ):(
      <TwoPlusTwo isBooked={isBooked} seat={seat} setSeat={setSeat}></TwoPlusTwo>
    )}
      

      {seat.length>0 && (
        <Grid container className="buyingContainer ">
          <h3>Seçilen koltuk</h3>
          <div className="relative seatContainer needHover">
            <EventSeat
              className="seat"
              style={{
                fontSize: 80,
                color: "red",
              }}
            />
            <h3 className="seatNumber">{seat}</h3>
          </div>
          <StripeButton
            up={() => history.push("/biletlerim")}
            price={price}
            seat={seat}
            id={user.id}
            tripId={tripId}
            email={user.email}
          ></StripeButton>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(Seats);
