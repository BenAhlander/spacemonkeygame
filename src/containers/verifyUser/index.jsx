import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function VerifyUser() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const confirmSignup = () => {
    Auth.confirmSignUp(email, code)
      .then((res) => {
        Auth.signIn(email, password).then((user) => {
          console.log({ user });
          history.push("/home");
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "85vh", padding: "24px" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper style={{ padding: "16px" }}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{ margin: "16px" }}
          >
            Verify Account and Log In
          </Typography>
          <Typography
            component="p"
            variant="body2"
            align="center"
            style={{ margin: "16px" }}
          >
            A code was sent to your email
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="code"
            label="code"
            id="code"
            autoComplete="current-code"
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={confirmSignup}
            style={{ marginTop: "16px" }}
          >
            Verify and Log In
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default VerifyUser;
