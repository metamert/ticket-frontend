import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import { setCurrentUser } from "../../../redux/user/user.actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BackspaceOutlined } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `20%`,
    left: `40%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    alignSelf: "center",
    width: "100%",
  },
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
    width: "50%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    backgroundColor: "white",
    // Fix IE 11 issue.
    padding: 40,
    marginTop: 10,
    position: "relative",
    height: 600,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddUser({ cancel, updatePage, create, history, cur_user, add_user }) {
  const classes = useStyles();
  const [data, set_data] = React.useState({});

  React.useEffect(() => {
    if (cur_user) {
      history.push("/login");
    }
  }, []);

  const check = () => {
    var phoneno = /^\d{10}$/;
    if (!data.phoneNumber) {
      return "phone number  cannot be empty";
    }
    if (data.password !== data.confirm) {
      return "şifreler eşleşmiyor";
    }

 

    if (!data.name) {
      return "isim boş olamaz";
    }
    if (!data.email) {
      return "email boş olamaz";
    }
    if (!data.tin) {
      return "tc kimlik no boş olamaz";
    }

   

    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        const body = data;
        const response = await fetch(`http://localhost:3000/auth/register`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes.status) {
          localStorage.setItem("token", parseRes.jwtToken);
          console.log(parseRes);

          add_user(parseRes);

          toast.success("Kayıt başarılı");
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
    set_data({ ...data, [name]: value });
  };
  console.log(data);
  return (
    <Grid container justify="center" style={{ marginTop: 50,position:"relative" }}>
      
           
      <div className="form-responsive" noValidate>
        <h1>Kullanıcı değiştir</h1>

        <Grid container row justify="space-between">
         <div spacing={3}>
         <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "46%" }}
            name="name"
            label="isim"
            type="name"
            id="name"
            autoComplete="name"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "46%" ,marginLeft:10}}
            id="lastName"
            label="soyisim"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
         </div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "45%" }}
            name="email"
            label="email"
            type="email"
            id="email"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Grid>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label="şifre "
          name="password"
          autoComplete="password"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="confirm"
          label="şifre tekrar "
          name="confirm"
          autoComplete="confirm"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          id="tin"
          label="tc kimlik no"
          name="tin"
          autoComplete="tin"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="numaric"
          id="hes"
          label="hes kodu"
          name="hes"
          autoComplete="hes"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

        <PhoneInput
          country={"tr"}
         
          onChange={(phone) => set_data({ ...data, phoneNumber: phone })}
        />

        <Button
          type="submit"
          style={{ marginRight: 20 }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={Submit}
        >
         Kullanıcıyı değiştir
        </Button>
        <Button
          type="submit"
          style={{ marginRight: 20 }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={cancel}
        >
        Vazgeç
        </Button>
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
});

const mapDispatchToState = (dispatch) => ({
  add_user: (payload) => dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToState)(AddUser);
