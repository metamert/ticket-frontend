import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser, setAdmin } from "../../redux/user/user.actions";
import { DirectionsBus } from "@material-ui/icons";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  return (
    <div className={classes.root} style={{ maxWidth: "100vw" }}>
      <AppBar
        position="static"
        color="#ff385c"
        style={{ maxWidth: "100vw", padding: "0 10%" }}
      >
        <MenuIcon className="disable-lg menu" onClick={() => setState(true)}>
          aç
        </MenuIcon>
        <SwipeableDrawer
          anchor={"right"}
          open={state}
          onClose={() => setState(false)}
          className="rightMenu"
        >
          {props.cur_user && (
            <Link to="/biletlerim">
              <Button
                color="secondary"
                variant="contained"
                className="lg-m xs-m"
              >
                biletlerim
              </Button>
            </Link>
          )}
          {!props.cur_user ? (
            <Link to="/login">
              <Button color="inherit" className="xs-m">
                Giriş yap
              </Button>
            </Link>
          ) : (
            <Link to="login">
              <Button
                color="inherit"
                onClick={() => {
                  props.del_user(null);
                }}
              >
                {" "}
                Çıkış yap
              </Button>
            </Link>
          )}
        </SwipeableDrawer>

        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              Orkun Turizm <DirectionsBus className="m1"></DirectionsBus>
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <div className="navbarContainer disable-xs">
            {props.cur_user && (
              <Link to="/biletlerim">
                <div className="blackButton" style={{ marginRight: 30 }}>
                  biletlerim
                </div>
              </Link>
            )}
            {!props.cur_user ? (
              <Link to="/login">
                <Button color="inherit">Giriş yap</Button>
              </Link>
            ) : (
              <Link to="login">
                <Button
                  color="inherit"
                  onClick={() => {
                    props.del_user(null);
                  }}
                >
                  {" "}
                  Çıkış yap
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const stateto = (state) => ({
  cur_user: state.user.currentUser,
  admin: state.user.admin,
});

const dispatchto = (dispatch) => ({
  del_user: () => dispatch(setCurrentUser(null)),
});

export default connect(stateto, dispatchto)(ButtonAppBar);
