import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

import { User, UserModel } from "../models/User";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user: User | null = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "no user found" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ error: "password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});
