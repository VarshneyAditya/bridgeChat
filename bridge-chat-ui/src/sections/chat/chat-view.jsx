/* eslint-disable */
import './chat.css';

import React, { useState, useEffect, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import {
  Send,
  Call,
  Search,
  VideoCall,
  ExpandMore,
  AttachFile,
  ExpandLess,
  InsertEmoticon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { account } from '../../_mock/account';
import { height } from '@mui/system';

const ChatView = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [infoExpanded, setInfoExpanded] = useState(false);

  // Define dummy messages for some users
  const dummyMessages = useMemo(
    () => ({
      0: [
        {
          id: 1,
          text: 'Hello! How are you?',
          sender: 'other',
          time: '12:00 PM',
        },
        {
          id: 2,
          text: 'I am good, thank you! How about you?',
          sender: 'self',
          time: '12:02 PM',
        },
      ],
      1: [
        {
          id: 3,
          text: "Hey! What's up?",
          sender: 'other',
          time: '11:45 AM',
        },
        {
          id: 4,
          text: 'Not much, just relaxing.',
          sender: 'self',
          time: '11:47 AM',
        },
      ],
      // Add more dummy messages for other users as needed
    }),
    []
  );

  const generateDummyData = useMemo(
    () => () =>
      Array.from({ length: 20 }, (_, idx) => ({
        id: idx,
        name: faker.name.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_${idx + 1}.jpg`,
        lastMessage: faker.lorem.sentence(),
        online: Math.random() > 0.5,
        lastActive: faker.date.recent().toLocaleTimeString(),
      })),
    []
  );

  useEffect(() => {
    setChats(generateDummyData());
  }, [generateDummyData]);

  useEffect(() => {
    setMessages(dummyMessages[selectedChat?.id] || []);
  }, [selectedChat, dummyMessages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'self',
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Chat</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Create Issue
        </Button>
      </Stack>
      <Card sx={{ padding: '16px 0px 0px 30px', marginLeft: '25px' }}>
        <Grid container spacing={2} style={{ height: '70vh' }}>
          {/* First column: Chat list */}
          <Grid item xs={3} className="chat-list" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Stack spacing={2} style={{ height: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div style={{ position: 'relative' }}>
                  <Avatar alt="User" src={account?.photoURL} />
                  <div className={`online-dot ${account?.online ? 'online' : 'offline'}`} />
                </div>
              </Stack>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search contacts"
                InputProps={{
                  startAdornment: <Search />,
                }}
              />
              <Paper style={{ flexGrow: 1, overflowY: 'auto' }}>
                <List>
                  {chats.map((chat) => (
                    <ListItem
                      key={chat.id}
                      button
                      selected={chat.id === selectedChat?.id}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <ListItemAvatar>
                        <div style={{ position: 'relative' }}>
                          <Avatar alt={chat.name} src={chat.avatarUrl} />
                          <div
                            className={`online-dot ${chat.online ? 'online' : 'offline'}`}
                            style={{ right: '13px' }}
                          />
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                        primary={chat.name}
                        secondary={
                          <>
                            {chat.lastMessage.length > 30
                              ? `${chat.lastMessage.slice(0, 30)}...`
                              : chat.lastMessage}
                            <br />
                            <Typography variant="caption" color="textSecondary">
                              {chat.lastActive}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Stack>
            <Divider orientation="vertical" flexItem />
          </Grid>
          {/* Second column: Chat view */}
          <Grid item xs={6} className="chat-view" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Stack spacing={2} style={{ height: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <div style={{ position: 'relative' }}>
                    <Avatar alt={selectedChat?.name} src={selectedChat?.avatarUrl} />
                    <div className={`online-dot ${selectedChat?.online ? 'online' : 'offline'}`} />
                  </div>
                  <div>
                    <Typography variant="h6">{selectedChat?.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {selectedChat?.online ? 'Online' : 'Offline'}
                    </Typography>
                  </div>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton>
                    <Call />
                  </IconButton>
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider /> {/* Add Divider after the top stack */}
              <Stack spacing={2} style={{ flexGrow: 1, overflowY: 'auto' }}>
                {messages.map((msg) => (
                  <Stack
                    key={msg.id}
                    direction={msg.sender === 'self' ? 'row-reverse' : 'row'}
                    alignItems="center"
                    spacing={2}
                  >
                    <Paper
                      variant="outlined"
                      style={{
                        padding: '10px 15px',
                        borderRadius: '20px',
                        maxWidth: '75%',
                        backgroundColor:
                          msg.sender === 'self' ? 'rgb(200, 250, 214)' : 'rgb(244, 246, 248)',
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Stack>
                ))}
              </Stack>
              {/* Add Divider above send message input */}
              <Divider />
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <InsertEmoticon />
                </IconButton>
                <TextField
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  variant="outlined"
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <Send />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          {/* Third column: User info */}
          <Grid item xs={3} className="user-info" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Stack spacing={2} style={{ height: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Avatar alt={selectedChat?.name} src={selectedChat?.avatarUrl} />
                <Stack direction="column" alignItems="flex-end">
                  <Typography variant="body1">{selectedChat?.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedChat?.online ? 'Online' : 'Offline'}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Paper style={{ padding: '16px', flexGrow: 1 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Information</Typography>

                  <Collapse in={infoExpanded}>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          Location:
                        </Typography>
                        <Typography variant="body2" style={{ marginLeft: '8px' }}>
                          Some Location
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          Phone:
                        </Typography>
                        <Typography variant="body2" style={{ marginLeft: '8px' }}>
                          +123 456 7890
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          Email:
                        </Typography>
                        <Typography variant="body2" style={{ marginLeft: '8px' }}>
                          user@example.com
                        </Typography>
                      </Stack>
                    </Stack>
                  </Collapse>
                  <Divider />
                  <Stack direction="row" justifyContent="flex-end">
                    {infoExpanded ? (
                      <IconButton onClick={() => setInfoExpanded(false)}>
                        <ExpandLess />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setInfoExpanded(true)}>
                        <ExpandMore />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ChatView;
