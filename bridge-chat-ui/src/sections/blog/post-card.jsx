import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ChatView } from 'src/sections/chat';


import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function PostCard({ post, onClick, index }) {
  console.log("Post" + JSON.stringify(post));
  const { cover, title, view, comment, share, author, createdAt } = post;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const qaList = [
    { question: "What is the material of this jewelry?", answer: "This piece is made from 18k gold." },
    { question: "Are the gems real diamonds?", answer: "Yes, the gems are real diamonds, certified for quality." },
    // More Q&A pairs...
  ];
  

  const renderAvatar = (
    <>
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...({
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
    <Link
      variant="body2"
      sx={{
        position: 'absolute',
        zIndex: 8,
        width: 32,
        height: 32,
        bottom: (theme) => theme.spacing(-2),
        left: (theme) => theme.spacing(5),
        color: '#000', // You can adjust the color
        background: '#fff', // Background color for contrast
        padding: '2px 8px', // Adjust padding as needed
        borderRadius: '4px', // Optional: Add border radius
        ...({
          zIndex: 8,
          top: 24,
          left: 70,
          width: 90,
          height: 40,
        }),
      }}
    >
      {author.name}
    </Link>
    </>
  );

  const renderQA = ({ qaList }) => (
    <Box
    
     color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 120,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'

      }}>
      {qaList.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Store: {item.question}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            Inventory: {item.answer}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'

      }}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: comment, icon: 'eva:message-circle-fill' },
        { number: view, icon: 'eva:eye-fill' },
        { number: share, icon: 'eva:share-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.48,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        right: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...({
          zIndex: 9,
          top: 24,
          right: 24,
          width: 80,
          height: 20,
        }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid item xs={12} sm={6} md={12} onClick={onClick}>
      <Card>
        {/* <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box> */}

        <Box  sx={{
            position: 'relative',
            pt: 'calc(100% * 1 / 5)',
            }}>
              
           { renderAvatar }
           { renderDate } 
        </Box>
        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...({
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
        {renderQA({ qaList })}
        {/* {renderInfo} */}
        </Box>
      </Card>
      
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
