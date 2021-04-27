import React from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import CitySelector from "../../../components/citySelect/citySelector";

import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";

import { validationIterator } from "../utils/utils";
import { toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { connect,useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import { setCurrentUser } from "../../../redux/user/user.actions";

function AddUser({
  cancel,
  updatePage,
  create,
  history,
  cur_user,
  add_user,
  admin,
}) {
  const [data, set_data] = React.useState({});
  const [buses, set_bus] = React.useState([]);
  const [hours, set_hours] = React.useState("17:45");


const adminDatas=useSelector(state=>state.user.admin)
//"jwt_token": adminDatas.jwt_token

  React.useEffect(() => {
    if (cur_user) {
      history.push("/login");
    }

    fetchBus()
  
   
  }, []);

  /**
 *   if (!data.phone_number.match(phoneno)) {
    return "phone number format is not correct";
  }
 * 
 */
const fetchBus=async ()=>{
    try {
        const body = data;
        const response = await fetch(`http://localhost:3000/bus`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "jwt_token": adminDatas.jwt_token
          },
          
         
        });
        const parseRes = await response.json();
        set_bus(parseRes.data)
    } catch (error) {
       
    }
}

  const check = () => {
    // var phoneno = /^\d{10}$/;

    const validate = validationIterator["trips"].map((item) => {
      console.log(data[item]);
      if (!data[item]) {
        console.log("girdi");
        return `${item} cannot be empty`;
      }
    });
    return validate[0];
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        const body = data;
        const response = await fetch(`http://localhost:3000/trip`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "jwt_token":admin.jwt_token
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes.status) {
          console.log(parseRes);

          add_user(parseRes);

          toast.success(" seyehat başarılı bir şekilde eklendi");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        toast.error(err.message);
        toast.error(err);
      }
    } else {
      toast.error(check());
    }
  };

  const onChange = (name, value) => {
      console.log("hi")
    set_data({ ...data, [name]: value });
  };
  /**
   *
   * departureFrom,arrivalIn,departure,busId,price,id
   */
 
  let bus=buses?.map(bus=>{

return { value: bus.name, label: bus.name,id:bus.id }

  })

  
const addTime=(hourMinute)=>{
console.log(data)
    set_hours(hourMinute)
let hour=hourMinute.split(":")[0]
let minute=hourMinute.split(":")[1]
let time=data.departure?data.departure:new Date()
    time =new Date(time)
console.log("hour",hour)
    time.setHours(hour,minute)
    set_data({...data,departure:time})
}
  
const addDate=(date)=>{
  
  let hour=hours.split(":")[0]
  let minute=hours.split(":")[1]
  let time=new Date(date)
    
 
      time.setHours(hour,minute)
      set_data({...data,departure:time})
  }
  

  return (
    <Grid container justify="center">
      <div className="form-responsive" noValidate>
        <h1>Seyehat oluştur</h1>
        <CitySelector
          city="istanbul"
          onchange={(e) => onChange("departureFrom",e.value)}
          name="nereden"
        />
        <CitySelector
          city="ankara"
          onchange={(e) => onChange("arrivalIn",e.value)}
          name="nereye"
        />
       <div className="row space-between margin-top-1">
       <TextField
        id="date"
       style={{width:"60%",margin:10}}
        label="tarih"
        type="date"
        name="departure"
        defaultValue="2021-27-04"
        onChange={(e) => addDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="time"
        label="saat"
        type="time"
        defaultValue="17:30"
        style={{width:"20%",margin:10}}
        onChange={(e) => addTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        value={hours}
        inputProps={{
          step: 300, // 5 min
        }}
      />
       </div>

       <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          
          type="number"
          id="price"
          label="fiyat"
          name="price"
          autoComplete="email"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
       
     <CitySelector
          city="ankara"
          options={bus}
          onchange={(e) => onChange("busId", e.id)}
          name="otobüsler"
        />
        


        <Button
          type="submit"
          style={{ marginRight: 20,marginTop:30 }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={Submit}
        >
      EKLE
        </Button>
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
  admin: state.user.admin,
});

const mapDispatchToState = (dispatch) => ({
  add_user: (payload) => dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToState)(AddUser);
