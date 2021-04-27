import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Slider from "./Slider"
class TripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.fetchTrips();
  }

  fetchTrips = async () => {
    console.log(this.props.location.state);
    var res = await axios.get("http://localhost:3000/trip/query", {
      params: this.props.location.state,
    });
    this.setState({ data: res.data.data });
  };

  render() {
    return (
      <Grid
        container
        column
        justify="center"
        alignItems="center"
        direction="column"
        className="fullh"
      >
        <h1 className="postCard">Seyehatler</h1>

        <div className="row fullw center">
          {this.state.data.length<1?<h1 className="postCard">Belirtilen tarihlerde sefer bulunamadı ...</h1>:
          
          <Slider slide_array={this.state.data}></Slider>
          }
          
        </div>
      </Grid>
    );
  }
}


export default TripPage;
