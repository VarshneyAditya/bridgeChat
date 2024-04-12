import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log(user, password);
    const s = "qwertyuiop";
    const isValidPassword = await bcrypt.compare(password, user.password);
    //   const token = jwt.sign({ email }, s, { expiresIn: "3m" });
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE3MDY5NzQ1OTQsImV4cCI6MTcwNjk3NDc3NH0.TXnNbwy6urtJA-FjinAFc5zaqrtViMT0kGWnwAC-BFE";
    const tokenVerify = jwt.verify(token, s);
    res.send({ message: "Success!!", isValidPassword, tokenVerify });
  } catch (err) {
    console.log('Error:', err);
    res.status(401).send(err);
  }
};
export default login;
