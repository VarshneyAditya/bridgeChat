import PropTypes from 'prop-types';
import { useState } from 'react';

import { Box } from '@mui/material/';
import {Link as MuiLink} from '@mui/material/';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Dialog, FormControl, InputLabel, Select, MenuItem, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function FeedbackUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        
      <Link to="/product-search">
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Link>
      </Box> */}
    </Card>
  );
}

FeedbackUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { image, title, description, author,  createdAt } = news;
  const [open, setOpen] = useState(false);

  const [feedbackDetails, setFeedbackDetails] = useState({
    description: '',
  });


  //For Popup

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Submitting bug details:', bugDetails);
    // Reset form fields
    setFeedbackDetails({
      description: '',
    });
    handleClose();
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{px:1}}>
      <Box
        component="img"
        alt={title}
        src={author?.avatarUrl}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
            <MuiLink color="inherit" variant="subtitle2" underline="hover" noWrap>
                {author?.name}
            </MuiLink>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {title}
            </Typography>
        </Box>

        

        <Button 
            size="small"
            variant="contained" 
            color="inherit" 
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            sx={{minWidth:'160px'}}
            onClick={handleOpen}
        >
            Submit Feedback
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Share Feedback</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="Feedback"
              label="Write Your Feedback Here"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={feedbackDetails.description}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
