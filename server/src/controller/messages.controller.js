import Message from "../model/messages.model.js";
import User from "../model/user.model.js";
import Chat from "../model/chats.model.js";

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

const updateMessages = async (req, res) => {
  const { content, chatId } = req.body;
  
  if (!content || !chatId) {
    return res.sendStatus(400);
  }
  
  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await message.populate("receiver");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getAllMessages, updateMessages };
