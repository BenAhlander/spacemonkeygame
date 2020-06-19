import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SpaceMonkeyIcon from "../../assets/icons/spaceMonkeyLogoWhite.svg";
import AppContext from "../../AppContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";
import { useHistory } from "react-router-dom";

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

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  let history = useHistory();

  const handleChangeTheme = () => {
    dispatch({
      type: "setTheme",
      value: state.theme === "light" ? "dark" : "light",
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img
            src={SpaceMonkeyIcon}
            style={{ width: "45px", marginRight: "16px" }}
            alt="Space Monkey Icon"
          />
          <Typography variant="h6" className={classes.title}>
            Ninja Space Monkey
          </Typography>
          <Hidden xsDown>
            <FormControlLabel
              control={
                <Switch
                  checked={state.theme === "dark"}
                  onChange={handleChangeTheme}
                  name="theme"
                  color="secondary"
                />
              }
              label="Dark Theme"
            />
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
