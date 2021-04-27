import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import {useSelector} from "react-redux"
import Orders from "./Orders";
import axios from "axios";
import { CircularProgress, TextField } from "@material-ui/core";
import BoxCard from "./box";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(true);
  const admin = useSelector((state) => state.user.admin);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [data, set_data] = React.useState();
  const [date, set_date] = React.useState({
    from: new Date("2017-05-24"),
    to: new Date(),
  });
  const [info, set_info] = React.useState();

  const [active, set_active] = React.useState([]);
  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    let datas = await axios.get("http://localhost:3000/statistic/alldata", {
      params: { from: date.from, to: date.to },
       headers: { jwt_token: admin.jwt_token }
    });
    const alldata = datas.data.all_data;
    let obj = { tickets: alldata.tickets, ...alldata.datas };
    set_data(obj);

    let sum = 0;
    alldata?.tickets.map((ticket) => (sum = sum + ticket.price));
    console.log("obj", obj);
    const info = {
      data: obj.users,
      Total: sum,
      bus: obj.bus.length,
      trips: obj.trips.length,
    };

    set_info(info);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (data && info) {
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className="row center-xs   margin-bottom-1 space-around">
            <div className="m1">
              <TextField
                id="date"
                onChange={(e) => set_date({ ...date, from: e.target.value })}
                label="Başlangıç tarihi"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                className="m1"
              />
            </div>
            <TextField
              id="date"
              onChange={(e) => set_date({ ...date, to: e.target.value })}
              label="Bitiş tarihi"
              type="date"
              className="m1"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div className="blackButton m1" onClick={getDatas}>
              filtrele
            </div>
          </div>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart info={info} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits info={info} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders data={data.tickets} />
                </Paper>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              container
              spacing={3}
              style={{ padding: 30 }}
              justify="space-around"
              alignItems="center"
            >
              <Paper className={classes.paper}>
                <BoxCard title={"toplam otobüs "} info={info.bus}></BoxCard>
              </Paper>
              <Paper className={classes.paper}>
                <BoxCard title={"toplam seyehat "} info={info.trips}></BoxCard>
              </Paper>
            </Grid>
          </Container>
        </main>
      </div>
    );
  } else {
    return <CircularProgress></CircularProgress>;
  }
}
