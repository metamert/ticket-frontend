import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import StripeButton from "../components/Stripe/StripeButton";
import axios from "axios"
function Tickets({ user }) {
  const [state, setstate] = useState([]);

  useEffect(async () => {
    update();
  }, []);

  const update = async () => {
console.log(user)
    try {
      let datas = await axios.get("http://localhost:3000/users/myTickets", {
      params: { id: user.id },
    });
    const parseRes = datas.data;
    console.log("datas",parseRes);
    setstate(parseRes.data);
   
    } catch (error) {
      console.log(error)
    }
  };

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }
console.log(state)
  return (
    <Grid container column className="ct " justify="center" alignItems="center">
      {state
        ?.sort((a, b) => b.id - a.id)
        .map((Ticket) => (
          <div className="shadow-card" key={Ticket.id}>
            <h4
              style={{
                position: "absolute",
                top: 30,
                left: 40,
                color: "#f50057",
              }}
            >
              {getFormattedDate(new Date(Ticket.departure))}
            </h4>
            <h4
              style={{
                position: "absolute",
                top: 30,
               right: 40,
                color: "#f50057",
              }}
            >
              {new Date(Ticket.departure).getHours()}:{new Date(Ticket.departure).getMinutes()}
            </h4>
            <h1 style={{ fontSize: 50 ,textAlign:"center"}}>
            {Ticket.departureFrom} {" "} {Ticket.arrivalIn}
            </h1>
            <Grid container row justify="space-between" alignItems="center">
              <h4 style={{ margin: 20, fontWeight: 500 ,color:"green"}} >
               
               {Ticket.price} {" "}  TRY
              </h4>
              <h3 style={{ margin: 20, fontWeight: 500 }} >
              {Ticket.name} {" "} {Ticket.lastName}
              </h3>
              <h4 style={{ margin: 20, fontWeight: 500 }} className="redbg">
              {Ticket.seat} numaralı koltuk
              </h4>
            </Grid>
           
          </div>
        ))}
    </Grid>
  );
}

const stateto = (state) => ({
  user: state.user.currentUser,
});

export default connect(stateto)(Tickets);
