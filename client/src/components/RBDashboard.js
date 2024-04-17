import React from 'react';
import { Button, Grid, Typography, Paper } from "@mui/material";
import Container from '@mui/material/Container';
import AppWidgetSummary from '../components/overview/app-widget-summary';
import { styled } from '@mui/material/styles';

const HoverPaper = styled(Paper)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10]
  }
}));

// Styled Typography for attractive heading
const StyledHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  background: 'rgb(112 52 132)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '2.5rem',
  textAlign: 'center',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(5),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));


function RBDashboard({ toggleOptions, showOptions }) {
  return (
    <>
      <Container maxWidth="xl">
        <StyledHeading variant="h4">
          RB DASHBOARD
        </StyledHeading>

        <Grid container spacing={3}>
          {[
            { title: "Total RB", total: 179, color: "warning" },
            { title: "In-Progress", total: 2, color: "info" },
            { title: "Hold", total: 79, color: "warning" },
            { title: "Done", total: 120, color: "success" },
            { title: "Last Month", total: 35, color: "error" },
            { title: "This Year", total: 234, color: "status" }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <HoverPaper elevation={3}>
                <AppWidgetSummary title={item.title} total={item.total} color={item.color} />
              </HoverPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {showOptions && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
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

export default RBDashboard;
