import React from 'react';
import { Button, Grid, Typography } from '@mui/material';


function SKUDashboard({ toggleOptions, showOptions }) {
    return (
      <>
        <Typography variant="h4" style={{ marginTop: 20, marginBottom: 50, marginLeft: 400 }}>SKU DASHBOARD</Typography>
         {/* Content Grid */}
         <Grid container spacing={2}>
              {/* First Row */}
              <Grid item xs={4}>
                <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                  <Typography variant="h6">Query from SKU </Typography>
                  <Typography variant="body1">5</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                  <Typography variant="h6">Done</Typography>
                  <Typography variant="body1">6</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                  <Typography variant="h6">Pending</Typography>
                  <Typography variant="body1">5</Typography>
                </div>
              </Grid>
              {/* Second Row */}
              <Grid item xs={4}>
                <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
                  <Typography variant="h6">Hold</Typography>
                  <Typography variant="body1">2</Typography>
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
  
  export default SKUDashboard;
  