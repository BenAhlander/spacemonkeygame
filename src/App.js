import React, { useReducer } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import amber from "@material-ui/core/colors/amber";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Router from "./Router";
import Nav from "./components/nav";
import AppContext from "./AppContext";
import AppReducer from "./reducer";
import init from "./init";
import { BrowserRouter } from "react-router-dom";
import History from "./history";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App(props) {
  const [state, dispatch] = useReducer(AppReducer, { theme: "light" }, init);

  let theme = createMuiTheme({
    palette: {
      type: state.theme,
      primary: blueGrey,
      secondary: amber,
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter history={History}>
      <AppContext.Provider value={[state, dispatch]}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Nav />
          {Router}
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
