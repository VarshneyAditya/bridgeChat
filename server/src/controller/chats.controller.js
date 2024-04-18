import Chat from "../model/chats.model.js";
import User from "../model/user.model.js";
import Message from "../model/messages.model.js"; // mandatory import

const getAllChats = async (req, res) => {
  try {
    // Fetch chats the user is part of, populate necessary fields, and sort results
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

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

const createChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password");

      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

const fetchGroupChat = async (req, res) => {
  try {
    const query = req.query.search
      ? {
          chatName: { $regex: `^${req.query.search}`, $options: "i" },
          _id: { $ne: req.user._id },
        }
      : {};
    const allGroups = await Chat.find(query);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const fetchAllUsersController = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: `^${req.query.search}`, $options: "i" } },
          {
            tags: {
              $all: [
                { $elemMatch: { $regex: `^${req.query.search}`, $options: "i"}  }
              ]
            }
          }
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
};


export { getAllChats, createChat, fetchGroupChat, fetchAllUsersController };
