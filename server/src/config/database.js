import mongoose from "mongoose";

class Database {
  constructor(URL) {
    this.url = URL;
  }
  open = async () => {
    try {
      mongoose.connect(this.url);
      console.log("MongoDB connected successfully! ");
    } catch (err) {
      console.log(err);
    }
  };
}

export default Database;
