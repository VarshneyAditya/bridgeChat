import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

function RBDashboard({ toggleOptions, showOptions }) {
  return (
    <>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 50, marginLeft: 400 }}>RB DASHBOARD</Typography>
       {/* Content Grid */}
       <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">Total RB</Typography>
                <Typography variant="body1">179</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">In-Progress</Typography>
                <Typography variant="body1">50</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">Hold</Typography>
                <Typography variant="body1">79</Typography>
              </div>
            </Grid>
            {/* Second Row */}
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">Done</Typography>
                <Typography variant="body1">120</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">Last Month</Typography>
                <Typography variant="body1">35</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                <Typography variant="h6">This Year</Typography>
                <Typography variant="body1">12</Typography>
              </div>
            </Grid>
          </Grid>
      {/* Conditionally rendered option buttons */}
      {showOptions && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" style={{ backgroundColor: '#8E1A86' }}>Create New RB</Button>
          <Button variant="contained" style={{ backgroundColor: '#8E1A86' }}>Create IPP Query</Button>
        </div>
      )}
    </>
  );
}

export default RBDashboard;
