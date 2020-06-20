import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Card from "../../components/card";
import listCards from "../../assets/demoData/listCards.json";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import { Auth, API } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  carasoul: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = listCards.length;

  //DO LATER
  const createNewCard = () => {
    Auth.currentSession().then((res) => {
      let accessToken = res.getAccessToken();
      let jwt = accessToken.getJwtToken();
      //You can print them to see the full objects
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
      console.log(`myJwt: ${jwt}`);
      const apiName = "spaceMonkey22";
      const path = "/helloWorld";
      const myInit = {
        // OPTIONAL
        // headers: {
        //   Accept: "*/*",
        //   Authorization: `Bearer ${jwt}`,
        //   "content-type": "application/json; charset=UTF-8",
        // },
        // requestContext: {
        //   authorizer: {
        //     claims: {
        //       "cognito:username": "the_username",
        //     },
        //   },
        // }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
          // OPTIONAL
          question: "Favorite Icecream?",
        },
      };

      API.post(apiName, path, myInit)
        .then((response) => {
          // Add your code here
          console.log({ response });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "85vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <div className={classes.carasoul}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {listCards.map((objProps, index) => (
                <div key={`card_${index}`}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Card {...objProps} id={`card_${index}`} />
                  ) : null}
                </div>
              ))}
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="progress"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SwipeableTextMobileStepper;
