import React from "react";
import "./select.css";
import SelectTable from "./homebox"
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/ticket.json";
const defaultOptions = {
  loop: true,

  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Container() {


  return (
    <div className="homepage-banner center-xs">
      <div className="container row reverse center-xs">
        <div className="col-lg-6 col-xs-12 col-md-12 select-table margin-top-2">
          <SelectTable></SelectTable>
        </div>

        <div className="col-lg-6 center margin-top-3 ">
         

          <div className="center">
          <Lottie options={defaultOptions}
              height={375}
              width={375}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
