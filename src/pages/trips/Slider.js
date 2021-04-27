import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TripBox from "../../components/Boxes/tripBox";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={"needHover"}
      style={{
        ...style,
        position: "absolute",
        color: "black",
        top: "45%",
        right: "0%",
        width: 20,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={"needHover"}
      style={{
        ...style,
        position: "absolute",
        color: "black",
        top: "45%",
        left: "0%",
        width: 20,
        zIndex: 200,
      }}
      onClick={onClick}
    />
  );
}

const Slide = ({ slide_array }) => {

 
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow className={"needHover"} />,
    prevArrow: <SamplePrevArrow className={"needHover"} />,
    responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true
          }
        }]
  };


  return (
    <div className="w100 p2 ">
      <Slider {...settings} arrows={true}>
      {
        slide_array?.map((trip) => (
              <div key={trip.tripId} className="col-xs-12 col-lg-12">
                <TripBox data={trip}></TripBox>
              </div>
            ))
        }
      </Slider>
    
    </div>
  );
};

export default Slide;
