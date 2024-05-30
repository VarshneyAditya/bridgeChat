import Container from '@mui/material/Container';
import { ChatView } from 'src/sections/chat';
import CreateIssueButton from 'src/components/create-issue/createIssueButton';

import Grid from '@mui/material/Unstable_Grid2';

import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export default function BlogView() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredQueries = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePostIssue = () => {
        // You can add functionality here for what happens when the issue is posted
        console.log("Issue Posted");
        handleClose();
    };

    const [selectedPost, setSelectedPost] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
  
    const handleOpenDialog = (post) => {
      setSelectedPost(post);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Bridge Communications</Typography>
            {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
                Post Issue
            </Button> */}
            <CreateIssueButton/>
        </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {filteredQueries.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} onClick={() => handleOpenDialog(post)} />
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedPost && (
          <>
            <ChatView render={false}/>
          </>
        )}
      </Dialog>
    </Container>
  );
}
