import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Users from "./user/show";
import Trips from "./trips/show";
import AddUser from "./user/add";
import AddTrip from "./trips/add";
import Bus from "./bus/show";
import NewBus from "./bus/add";
import Statistic from "./statistic/Dashboard";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

import Container from "@material-ui/core/Container";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";


import { ArrowRight, ChevronRight, ExitToApp } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../../redux/user/user.actions";
import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Admin() {
  const classes = useStyles();
  const admin = useSelector((state) => state.user.admin);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    const response = await fetch(`http://localhost:3000/auth/verify`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        jwt_token: admin.jwt_token,
      },
    });

    if (response.status == 401) {
      alert("token geçersiz login sayfasına yönlendiriliyorsunuz");
      dispatch({ type: "setAdmin", payload: null });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => dispatch({ type: "setAdmin", payload: null })}
          >
            <ExitToApp></ExitToApp>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ArrowRight />
            </IconButton>
          )}
        </div>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="İstatistikler" {...a11yProps(0)} />
          <Tab label="Kullanıcılar" {...a11yProps(1)} />

          <Tab label="Seyehatler" {...a11yProps(2)} />

          <Tab label="Otobüsler" {...a11yProps(3)} />
          <Tab label="Yeni Kullanıcı" {...a11yProps(4)} />
          <Tab label="Yeni Seyehat" {...a11yProps(5)} />
          <Tab label="yeni otobüs" {...a11yProps(6)} />
        </Tabs>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <TabPanel className="w100" value={value} index={0}>
            <Statistic />
          </TabPanel>
          <TabPanel className="w100" value={value} index={1}>
            <Users />
          </TabPanel>
          <TabPanel className="w100" value={value} index={2}>
            <Trips />
          </TabPanel>
          <TabPanel className="w100" value={value} index={3}>
            <Bus></Bus>
          </TabPanel>
          <TabPanel className="w100" value={value} index={4}>
            <AddUser />
          </TabPanel>
         
          <TabPanel className="w100" value={value} index={5}>
            <AddTrip />
          </TabPanel>
        
          <TabPanel className="w100" value={value} index={6}>
            <NewBus />
          </TabPanel>
        </Container>
      </main>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
  },
  tabs: {
    minWidth: 140,
    borderRight: `1px solid ${theme.palette.divider}`,
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
