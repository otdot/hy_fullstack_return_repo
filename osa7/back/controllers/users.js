const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs", {
    title: 1,
    likes: 1,
    url: 1,
  });
  res.json(user);
});

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "username must be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ savedUser });
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
