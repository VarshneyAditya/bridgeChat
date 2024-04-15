import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      default: '',
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'messages',
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model('chats', chatSchema);

export default Chat;
