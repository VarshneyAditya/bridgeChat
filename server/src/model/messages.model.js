import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'chats',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model('messages', messageSchema);

export default Message;
