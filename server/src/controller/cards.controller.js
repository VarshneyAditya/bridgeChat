import Cards from '../model/cards.model.js';

const cards = async (req, res) => {
  try {
    const data = await Cards.find({});
    res.json({ chats: data });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { cards };
