import React from "react";
import { Button, Grid, Typography } from "@mui/material";

function MYDashboard({ showOptions }) {
  return (
    <>
      <Typography
        variant="h4"
        style={{ marginTop: 20, marginBottom: 50, marginLeft: 400 }}
      >
        MY DASHBOARD
      </Typography>
      {/* Content Grid */}
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">My RB</Typography>
            <Typography variant="body1">20</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">Open IPP</Typography>
            <Typography variant="body1">6</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">Query from Order</Typography>
            <Typography variant="body1">5</Typography>
          </div>
        </Grid>
        {/* Second Row */}
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">Pending Action</Typography>
            <Typography variant="body1">2</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">Hold</Typography>
            <Typography variant="body1">3</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#f5f5f5", padding: 80 }}>
            <Typography variant="h6">This Year</Typography>
            <Typography variant="body1">12</Typography>
          </div>
        </Grid>
      </Grid>
      {/* Conditionally rendered option buttons */}
      {showOptions && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" style={{ backgroundColor: "#8E1A86" }}>
            Create New RB
          </Button>
          <Button variant="contained" style={{ backgroundColor: "#8E1A86" }}>
            Create IPP Query
          </Button>
        </div>
      )}
    </>
  );
}

export default MYDashboard;
