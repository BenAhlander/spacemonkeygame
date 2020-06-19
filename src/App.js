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

function App() {
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
    <AppContext.Provider value={[state, dispatch]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />
        {Router}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
