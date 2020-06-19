import React from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Router from "./Router";
import Nav from "./components/nav";

function App() {
  let theme = createMuiTheme({
    palette: {
      type: "light",
      primary: blueGrey,
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      {Router}
    </ThemeProvider>
  );
}

export default App;
