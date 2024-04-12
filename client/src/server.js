const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

const dummyChats = [
  { id: 1, message: 'Hello!', orderId: '12345' },
  { id: 2, message: 'Hi there!', orderId: '67890' },
  { id: 3, message: 'How are you?', orderId: 'ABCDE' },
  { id: 4, message: 'I am good', orderId: 'test' },
];

// Route to handle POST requests
app.post('/Chats', (req, res) => {
  res.json({ chats: dummyChats });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
