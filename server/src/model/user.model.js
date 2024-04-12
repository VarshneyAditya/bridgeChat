import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: true,
  },
  password: String,
});

export default mongoose.model("users", schema);
