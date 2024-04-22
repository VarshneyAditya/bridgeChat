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
import axios from 'axios';

import Iconify from 'src/components/iconify';

import { account } from '../../_mock/account';
import CreateIssueButton from 'src/components/create-issue/createIssueButton';

const ChatView = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [chatId, setChatId] = useState('');

  const userData = JSON.parse(localStorage.getItem("userData"));

  const { token, _id: userId } = userData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {

        const { data = [] } = await axios.get(
          "http://localhost:3000/api/chats/conversation",
          config
        );

        const chat = data.map((item, index) => {
          const chatId = item._id;
          const isGroupChat = item.isGroupChat;
          const chatName = isGroupChat ? item.chatName : (userId === item.users[0]._id ? item.users[1].name : item.users[0].name);
          const lastMessageContent = item.latestMessage?.content || 'no messages';
          const online = Math.random() > 0.5;
          const lastActive = item.latestMessage?.content ? faker.date.recent().toLocaleTimeString() : '';
        
          return {
            id: index,
            chatId,
            name: chatName,
            avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
            lastMessage: lastMessageContent,
            online: online,
            lastActive: lastActive,
          };
        }).filter(Boolean);        
        
        console.log(chat);
        
        setChats(chat);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/messages/${chatId}`,
          config
        );
        const { data } = response;
        const msg = data.map((message) => {
          const senderId = message?.sender?._id;
          const sender = (userId === senderId) ? 'self' : 'other';
          const text = message.content;
          // Assuming time is not provided in the original data, you can use a placeholder or format the timestamp if available
          const time = message.updatedAt; // Replace with the actual timestamp if available
          
          return {
            id: message._id,
            text: text,
            sender: sender,
            time: time,
          };
        });
        setMessages(msg);
        // setLoaded(true);
        // socket.emit("join chat", chatId);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
    // setMessages(dummyMessages[selectedChat?.id] || []);
  }, [chatId]);

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{margin: "5px 31px 35px 31px"}}>
        <Typography variant="h4">Chat</Typography>
        <CreateIssueButton token={token}/>
      </Stack>
      <Card sx={{ padding: '16px 0px 0px 30px', margin: '0px 24px 0px 24px'}}>
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
                      // selected={chat._id === selectedChat}
                      onClick={() => setChatId(chat.chatId)}
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
