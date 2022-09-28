const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { username, password: rawPassword, name } = req.body;
  if (rawPassword.length < 3)
    return res.status(400).json({
      error: `Password is too short (\`${rawPassword}\`), it must be at least 3 chars long.`,
    });
  const saltRounds = 10;

  try {
    const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

    const user = new User({ username, password: passwordHash, name });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
