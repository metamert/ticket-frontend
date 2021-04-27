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
  const [data, set_data] = React.useState({"wifi":false,"foodService":false,"tv":false});
  const [buses, set_bus] = React.useState([]);
  const [hours, set_hours] = React.useState("17:45");
  const adminT = useSelector((state) => state.user.admin);

  React.useEffect(() => {
    if (cur_user) {
      history.push("/login");
    }

    
  
   
  }, []);

  /**
 *   if (!data.phone_number.match(phoneno)) {
    return "phone number format is not correct";
  }
 * 
 */


  const check = () => {
    // var phoneno = /^\d{10}$/;

    const validate = validationIterator["bus"].map((item) => {
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
        const response = await fetch(`http://localhost:3000/bus`, {
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

          toast.success("başarılı bir şekilde eklendi");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        toast.error(err.message);
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
 
  
  


console.log(data)
  return (
    <Grid container justify="center">
      <div className="form-responsive" noValidate>
        <h1>Otobüs oluştur</h1>
       
       

     
        

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          
        
          id="name"
          label="isim"
          name="name"
          autoComplete="email"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      
       
      <FormControl
          variant="filled"
          style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
        >
          <InputLabel id="demo-simple-select-filled-label">Otobüs tipi</InputLabel>
          <Select
           
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={(e) => {
              onChange("busType", e.target.value);
            }}
          >
          <MenuItem value="2+1">2+1</MenuItem>
          <MenuItem value="2+2">2+2</MenuItem>
          </Select>
        </FormControl>
       
      <FormControlLabel
            control={
              <Checkbox
                checked={data.wifi}
                onChange={(e) => {
                  onChange("wifi", e.target.checked);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="wifi"
          />
            <FormControlLabel
            control={
              <Checkbox
                checked={data.foodService}
                onChange={(e) => {
                  onChange("foodService", e.target.checked);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Yemek servisi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.tv}
                onChange={(e) => {
                  onChange("tv", e.target.checked);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="televizyon"
          />

        <Button
          type="submit"
          style={{ marginRight: 20 }}
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
