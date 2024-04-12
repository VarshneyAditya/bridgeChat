import Cards from '../model/cards.model.js';

const dummyChats = [
  { id: 1, message: "Hello!", orderId: "12345" },
  { id: 2, message: "Hi there!", orderId: "67890" },
  { id: 3, message: "How are you?", orderId: "ABCDE" },
  { id: 4, message: "I am good", orderId: "test" },
];

const cards = async (req, res) => {
  try {
    const data = await Cards.find({});
    res.json({ chats: data });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default cards;
