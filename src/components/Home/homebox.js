import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowRight from "../../assets/svg/arrow-right.svg";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { ArrowForward, SearchOutlined } from "@material-ui/icons";
import CitySelector from "../../components/citySelect/citySelector";
export default function SelectForm() {
  const [checked, setChecked] = useState(false);
  const [data, set_data] = React.useState({});
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  let history = useHistory();
  function handleSearch() {
    history.push("/seyehatler", { ...data });
  }
  const onChange = (name, value) => {
    console.log("hi", name);
    console.log("value", value);
    set_data({ ...data, [name]: value });
  };

 
  return (
    <div className="fullw">
      <div className="row center-xs   margin-bottom-1">
        <div className="col-xs-12  start-xs ">
          <CitySelector
      
            city="istanbul"
            onchange={(e) => onChange("departureFrom", e.value)}
            name="nereden"
          />
          <CitySelector
          
            city="ankara"
            onchange={(e) => onChange("arrivalIn", e.value)}
            name="nereye"
          />
        </div>

        <div className="col-xs-12  col-xs-4 end-xs margin-top-1 p2">
          <TextField
            id="date"
            onChange={(e) => onChange("departure", e.target.value)}
            label="seyehat tarihi"
            type="date"
            fullWidth
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <div className="row between-xs margin-top-2 padding-left-1">
        <div
          className="rent-button center-xs row xs-margin-top-1 fullw"
          onClick={handleSearch}
        >
          Seyehat bul
       
        </div>
      </div>
    </div>
  );
}
