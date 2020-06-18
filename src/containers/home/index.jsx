import React from "react";
import Card from "../../components/Card";
import listCards from "../../assets/demoData/listCards.json";
import Grid from "@material-ui/core/Grid";

function Home() {
  const renderCard = (objProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card {...objProps} />
      </Grid>
    );
  };
  return (
    <div style={{ padding: "24px" }}>
      <Grid container spacing={3}>
        {listCards.map(renderCard)}
      </Grid>
    </div>
  );
}

export default Home;
