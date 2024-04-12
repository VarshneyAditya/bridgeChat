const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

const dummyChats = [
  { id: 1, message: 'Hello!', order_id: '12345' },
  { id: 2, message: 'Hi there!', order_id: '67890' },
  { id: 3, message: 'How are you?', order_id: 'ABCDE' },
];

// Route to handle POST requests
app.post('/Chats', (req, res) => {
  const { orderId } = req.body;
  const chatsForOrder = dummyChats.filter(chat => chat.order_id === orderId);
  res.json({ chats: chatsForOrder });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
