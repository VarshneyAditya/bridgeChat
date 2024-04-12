import bcrypt from 'bcrypt';

import User from "../model/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).limit(5);
    res.status(200).send({ code: 200, message: "success", data });
  } catch (err) {
    throw err;
  }
};

const createUser = async (req, res) => {
  try {
    const { password: Password } = req.body;
    const password = await bcrypt.hash(Password, 10);
    const data = await User.create({...req.body, password});
    res.status(200).send({ code: 200, message: "success", data });
  } catch (err) {
    throw err;
  }
};

export { getAllUsers, createUser };
