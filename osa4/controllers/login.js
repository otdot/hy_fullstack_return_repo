const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const correctPassword = user
    ? bcrypt.compare(password, user.passwordHash)
    : false;

  if (!(user && correctPassword)) {
    return res.status(401).send({ error: "username or password invalid" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jsonwebtoken.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
