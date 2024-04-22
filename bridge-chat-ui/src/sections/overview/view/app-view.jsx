import UserPage from '../../report-bug/view/rb-view';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const { name = 'Welcome back'} = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, {name} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Reported Bugs"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/icons8-bug-64.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="In Progess"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/icons8-pending-64.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Hold"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/icons8-pause-64 (1).png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Done"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/icons8-ok-64.png" />}
          />
        </Grid>
      </Grid>
      <UserPage/>
    </Container>
  );
}
