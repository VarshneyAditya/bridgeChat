import Chat from '../model/chats.model.js';
import User from '../model/user.model.js';

const getAllChats = async (req, res) => {
  try {

    // Fetch chats the user is part of, populate necessary fields, and sort results
    let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    console.log("Fetch Chats API:", chats);


    // Populate latestMessage.sender with user data
    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email",
    });

    // Send the results as a successful response
    return res.status(200).json(chats);
  } catch (error) {
    // Handle any errors by sending a 400 status code
    console.error("Error fetching chats:", error);
    return res.status(400).json({ error: "Failed to fetch chats." });
  }
};

export { getAllChats };
