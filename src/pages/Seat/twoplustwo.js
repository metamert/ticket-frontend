import React from 'react'

import { Grid } from "@material-ui/core";

import { EventSeat } from "@material-ui/icons";

export default function twoplusone({seat,isBooked,setSeat}) {
    return (
        <div>
            <Grid container direction="row" className="bus " justify="space-between">
            <Grid container xs={5}>
        {["1", "2", "5", "6", "9", "10", "13", "14", "17", "118"].map(
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
        <Grid container xs={5}>
          {["3", "4", "7", "8", "11", "12", "15", "16", "19", "20"].map(
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
