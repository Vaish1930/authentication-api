import bcrypt from "bcryptjs";
import { Router } from "express";
import Auth from "../models/Auth.js";
import { generateToken, verifyToken } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesEmailExists = await Auth.findOne({ email });
    if (doesEmailExists)
      return res.status(400).json(`User with this ${email} already  exists `);
    // salt creation

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new Auth({ ...req.body, password: hashedPassword });
    const createdUser = await user.save();
    const token = generateToken(createdUser);

    res.status(201).header("authToken", token).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesUserExists = await Auth.findOne({ email });
    if (!doesUserExists) return res.status(400).json(`Invalid email`);

    // comparing password
    const isPasswordValid = await bcrypt.compare(
      password,
      doesUserExists.password
    );

    if (!isPasswordValid) return res.status(400).json(`Invalid password`);

    const token = generateToken(doesUserExists);

    res.status(200).header("authToken", token).json({
      _id: doesUserExists._id,
      name: doesUserExists.name,
      email: doesUserExists.email,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.patch("/user/update", verifyToken, async (req, res) => {
  try {
    // const { name } = req.body;
    const user = await Auth.findByIdAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    });
    const token = req.header("authToken");
    res.status(200).header("authToken", token).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
