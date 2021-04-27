import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Navbar from "../src/components/navbar/navbar";
import Tickets from "./pages/Tickets";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./pages/home";

import AdminLogin from "./pages/Admin/adminLogin";
import Login from "./pages/login";

import Admin from "./pages/Admin/adminDashboard";
import AdminNavbar from "./components/navbar/AdminNavbar";
import Register from "./pages/register";
import TripPage from "./pages/trips/tripPage";
import Seat from "./pages/Seat/seat.js";
import { ToastContainer, toast } from "react-toastify";

import { connect } from "react-redux";
import { Component } from "react";
class App extends Component {
  
constructor(props){
  super(props)
}

  render(){
const {user,admin}=this.props
    return (
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              false ? (
                <Redirect to="/" />
              ) : (
                [<Navbar {...props} />, <Home {...props} />]
              )
            }
          />
          <Route
            exact
            path="/seyehatler"
            render={(props) =>
              false ? (
                <Redirect to="/" />
              ) : (
                [<Navbar {...props} />, <TripPage {...props} />]
              )
            }
          />
          <Route
            exact
            path="/koltuksec"
            render={(props) =>
              !user ? (
                <Redirect to="/login" />
              ) : (
                [<Navbar {...props} />, <Seat {...props} />]
              )
            }
          />
  
  
          <Route
            exact
            path="/biletlerim"
            render={(props) =>
              !user ? (
                <Redirect to="/login" />
              ) : (
                [<Navbar {...props} />, <Tickets {...props} />]
              )
            }
          />
  
          <Route
            exact
            path="/admin"
            render={(props) =>
              !admin ? (
                <Redirect to="/admin-login" />
              ) : (
                [<AdminNavbar {...props} />, <Admin {...props} />]
              )
            }
          />
  
          <Route
            exact
            path="/admin-login"
            render={(props) =>
              false ? (
                <Redirect to="/admin" />
              ) : (
                [<AdminNavbar {...props} />, <AdminLogin {...props} />]
              )
            }
          />
  
          <Route
            exact
            path="/login"
            render={(props) =>
              user ? (
                <Redirect to="/" />
              ) : (
                [<Navbar {...props} />, <Login {...props} />]
              )
            }
          />
  
          <Route
            exact
            path="/register"
            render={(props) =>
              user ? (
                <Redirect to="/" />
              ) : (
                [<Navbar {...props} />, <Register {...props} />]
              )
            }
          />
        </Switch>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    );

  }
  
}

const stateTo = (state) => ({
  user: state.user.currentUser,
  admin: state.user.admin,
});

export default connect(stateTo)(App);
