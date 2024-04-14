import UserModel from "../model/user.model.js";
import generateToken from "../config/generatetoken.js";

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).send({
        code: 400,
        error: "All necessary input fields have not been filled",
      });
    }

    const user = await UserModel.findOne({ name });

    if (!user) {
      // If user does not exist, respond and return immediately
      return res.status(400).send({ error: "User does not exist" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // If password doesn't match, respond and return immediately
      return res.status(400).send({ error: "Invalid password" });
    }

    // User and password matched, respond with user data and token
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    return res.status(200).send(response);
  } catch (err) {
    console.log("Error:", err);
    // Return 401 error in case of an exception
    return res.status(401).send(err);
  }
};


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for all fields
    if (!name || !email || !password) {
      return res.status(400).send({
        code: 400,
        error: "All necessary input fields have not been filled",
      });
    }

    // Pre-existing user
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(405).send({ code: 405, error: "User already exists" });
    }

    // Username already taken
    const userNameExist = await UserModel.findOne({ name });
    if (userNameExist) {
      return res
        .status(406)
        .send({ code: 406, error: "Username already taken" });
    }

    // Create an entry in the DB
    const user = await UserModel.create({ name, email, password });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send({ code: 400, error: "Registration Error" });
    }
  } catch (error) {
    return res.send(error);
  }
};

export { login, signup };
