import React from 'react'

import { Grid } from "@material-ui/core";

import { EventSeat } from "@material-ui/icons";

export default function twoplusone({seat,isBooked,setSeat}) {
    return (
        <div>
            <Grid container direction="row" className="bus " justify="space-between">
        <Grid container xs={6} direction="column" justify="center m1">
          {["1", "4", "7", "10", "13"].map((seatNum) => 
           
              <div
              className={`relative seatContainer needHover ${isBooked(seatNum)&&"disabled"}`}
                onClick={() => setSeat(seatNum)}
              >
                <EventSeat
                  className="seat"
                  style={{
                    fontSize: 80,
                    color: isBooked(seatNum)?"gray":(seat === seatNum ? "green" : "black"),
                  }}
                />
                <h3 className="seatNumber">{seatNum}</h3>
              </div>
        
          )}
        </Grid>
        <Grid container xs={5}>
          {["2", "3", "5", "6", "8", "9", "11", "12", "14", "15"].map(
            (seatNum) => (
              <Grid
                item
                xs={6}
                className={`relative seatContainer needHover ${isBooked(seatNum)&&"disabled"}`}
                onClick={() => setSeat(seatNum)}
              >
                <EventSeat
                  className="seat"
                  style={{
                    fontSize: 80,
                    color: isBooked(seatNum)?"gray":(seat === seatNum ? "green" : "black"),
                  }}
                />
                <h3 className="seatNumber">{seatNum}</h3>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
        </div>
    )
}
