import UserModel from "../model/user.model.js";
import generateToken from "../config/generatetoken.js";

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });

    if (user && (await user.matchPassword(password))) {
      const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      };
      res.json(response);
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(401).send(err);
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
