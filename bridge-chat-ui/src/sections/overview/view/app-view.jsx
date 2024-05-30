import RbDashboardPage from '../../report-bug/view/rb-view';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {Button, Box, Stack, Card, CardHeader} from '@mui/material';
import SkuDashboardPage from '../../sku-details/view/sku-view';
import AppWidgetSummary from '../app-widget-summary';
import FeedbackUpdate from '../feedback-update';
import { posts } from 'src/_mock/blog';

import { useState } from 'react';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import ProductGrid from "../product-search";
// ----------------------------------------------------------------------

export default function AppView() {
  const { name = 'Welcome back'} = JSON.parse(localStorage.getItem("userData")) || {};
  const [skuDetailsPageView, setSkuDetailsPageView] = useState(false);

  const handleSkuDetailsPageView = () => {
    setSkuDetailsPageView(prevState => !prevState);
  };

  return (
    <Container maxWidth="xl">
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, {name} 👋
      </Typography> */}

     

      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
        <Button onClick={handleSkuDetailsPageView} variant="contained" color="inherit">
          {skuDetailsPageView ?  'Show Bugs Details' :  'Show SKU Details' }
        </Button>
      </Stack>

      <Grid container spacing={3}>

      {!skuDetailsPageView ? <Grid container xs={12} md={12} lg={12} spacing={3}>
          <Grid xs={12} sm={2} md={3}>
            <AppWidgetSummary
              title="Total Reported Bugs"
              total={10}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-bug-64.png" />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="In Progess"
              total={5}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-pending-64.png" />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Hold"
              total={2}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-pause-64 (1).png" />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Done"
              total={3}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-ok-64.png" />}
            />
          </Grid>
        </Grid> :
        <Grid container xs={12} md={12} lg={12} spacing={3}>
          <Grid xs={12} sm={2} md={3}>
            <AppWidgetSummary
              title="Total Queries"
              total={110}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-inquiry-64.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Unanswered Queries"
              total={16}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-pending-64.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="My Queries"
              total={2}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-raise-a-hand-to-answer-64.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Answered"
              total={3}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/icons8-ok-64.png" />}
            />
          </Grid>
        </Grid>}


      {skuDetailsPageView && <Grid xs={12} md={6} lg={8}>
        <AppNewsUpdate
          title="My Recent Queries"
          list={posts}
        />
      </Grid>}

      
      {/* {skuDetailsPageView && <Grid xs={12} md={6} lg={4}>
          <ProductGrid/>
      </Grid>} */}

      {/* Graph-2 */}
      {skuDetailsPageView ? 
      
      // <Grid xs={12} md={6} lg={8}>
      //   <AppWebsiteVisits
      //     title="Product Queries Report"
      //     subheader="(+3%) than last week"
      //     chart={{
      //       labels: [
      //         '01/01/2003',
      //         '02/01/2003',
      //         '03/01/2003',
      //         '04/01/2003',
      //         '05/01/2003',
      //         '06/01/2003',
      //         '07/01/2003',
      //         '08/01/2003',
      //         '09/01/2003',
      //         '10/01/2003',
      //         '11/01/2003',
      //       ],
      //       series: [
      //         // {
      //         //   name: 'In Progress',
      //         //   type: 'area',
      //         //   fill: 'gradient',
      //         //   data: [23, 17, 13, 27, 13, 22, 30, 21, 44, 35, 21],
      //         // },
      //         {
      //           name: 'Average Response Time',
      //           type: 'column',
      //           fill: 'solid',
      //           data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      //         },
      //         {
      //           name: 'Total Queries',
      //           type: 'area',
      //           fill: 'gradient',
      //           data: [55, 30, 22, 43, 30, 52, 63, 41, 56, 47, 63],
      //         },
      //         // {
      //         //   name: 'Done',
      //         //   type: 'line',
      //         //   fill: 'solid',
      //         //   data: [30, 4, 9, 20, 17, 30, 24, 10, 34, 10, 39],
      //         // },

      //       ],
      //     }}
      //   />
      // </Grid>

     < Grid xs={12} md={6} lg={4}>
          <ProductGrid/>
      </Grid>
      :
      <Grid xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title="Reported Bugs Report"
          subheader="(+43%) than last year"
          chart={{
            labels: [
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ],
            series: [
              {
                name: 'In Progress',
                type: 'area',
                fill: 'gradient',
                data: [23, 17, 13, 27, 13, 22, 30, 21, 44, 35, 21],
              },
              {
                name: 'Total Reported Bugs',
                type: 'area',
                fill: 'gradient',
                data: [55, 30, 22, 43, 30, 52, 63, 41, 56, 47, 63],
              },
              {
                name: 'Done',
                type: 'line',
                fill: 'solid',
                data: [30, 4, 9, 20, 17, 30, 24, 10, 34, 10, 39],
              },
              {
                name: 'Hold',
                type: 'line',
                fill: 'solid',
                data: [2, 5, 10, 3, 11, 2, 6, 13, 1, 6, 11],
              },
            ],
          }}
        />
      </Grid>
      
      }

{skuDetailsPageView &&<Grid xs={12} md={6} lg={8}>
        <FeedbackUpdate title="Resolved Queries"
            list={posts}/>
      </Grid>}
      
      

      {!skuDetailsPageView ? <Grid xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title="Bug Assignment Breakdown"
          chart={{
            series: [
              { label: 'Me', value: 5 },
              { label: 'Abhishek', value: 4 },
              { label: 'Saransh', value: 3 },
              { label: 'Shrey', value: 2 },
            ],
          }}
          type = "pie"
        />
      </Grid> : <Grid xs={12} md={6} lg={4}>
        {/* <AppCurrentVisits
          title="Unanswered Query vs SKU Distribution"
          chart={{
            series: [
              { label: 'UR00175', value: 5 },
              { label: 'PR00174', value: 4 },
              { label: 'KJL0193', value: 3 },
              { label: 'JDJ9103', value: 2 },
              { label: 'JDJ9103', value: 2 },
            ],
          }}
          type = "donut"
        />
        <Card>
          <CardHeader title="Pinned"></CardHeader>

          <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
              px: 3,
              py: 5,
              borderRadius: 2,
            }}
          >
            {icon n&& <Box sx={{ width: 64, height: 64 }}>{icon}</Box>} 
            <Box sx={{ width: 64, height: 64 }}><img alt="icon" src="/assets/icons/glass/icons8-ok-64.png" /></Box>
            
            <Stack spacing={0.5}>
              <Typography variant="h2">8</Typography>

              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                 Threads
              </Typography>
            </Stack>
          </Card>
          
        </Card>
        <Card>
          <CardHeader title="Liked"></CardHeader>
        </Card> */}

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Actions"
            list={[
              {
                name: 'Pinned',
                value: 8,
                icon: <Iconify icon="ic:baseline-push-pin" color="#1877F2" width={64} />,
              },
              {
                name: 'Liked',
                value: 12,
                icon: <Iconify icon="icon-park-solid:like" color="#DF3E30" width={64} />,
              },
              {
                name: 'Tagged',
                value: 2,
                icon: <Iconify icon="icon-park-solid:tag" color="#006097" width={64} />,
              },
              {
                name: 'Chat',
                value: 22,
                icon: <Iconify icon="ic:round-chat" color="#247031" width={64} />,
              },
            ]}
          />
        </Grid>
      </Grid>}
      
      

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}
      </Grid>
      {skuDetailsPageView ? <SkuDashboardPage/> : <RbDashboardPage/>}
    </Container>
  );
}
