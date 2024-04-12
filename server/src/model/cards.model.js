import mongoose from "mongoose";

const schema = new mongoose.Schema({
  order_id: String,
  last_message: String,
  thread_id: String,
});

export default mongoose.model("cards", schema);
