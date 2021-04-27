import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { setAdmin } from "../../redux/user/user.actions";
import "react-toastify/dist/ReactToastify.css";

function SignIn(props) {
  const classes = useStyles();
  const [data, setdata] = React.useState({ email: "", password: "" });

  const handleSubmit = async () => {
    if (data.email && data.password) {
      try {
        const body = { email: data.email, password: data.password };
        const response = await fetch(
          "http://localhost:3000/auth/adminLogin",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const parseRes = await response.json();
        console.log(parseRes);

        if (parseRes.status) {
          //  localStorage.setItem("token", parseRes.jwtToken);
          props.adduser(parseRes.admin);
          toast.success("Logged in Successfully");
          props.history.push("/admin");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      if (data.email) {
        toast.error("enter password");
      } else {
        toast.error("enter email");
      }
    }
  };

  const handleChange = (name, val) => {
    setdata({ ...data, [name]: val });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
            id="password"
            autoComplete="current-password"
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Admin login
          </Button>

          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

const dispatchto = (dispatch) => ({
  adduser: (p) => dispatch(setAdmin(p)),
});

export default connect(null, dispatchto)(SignIn);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
