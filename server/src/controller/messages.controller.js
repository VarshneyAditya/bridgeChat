import Message from "../model/messages.model.js";

const getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat");
    return res.json(messages);
  } catch ({ message }) {
    return res.status(400).json({ error: message });
  }
};

export { getAllMessages };
