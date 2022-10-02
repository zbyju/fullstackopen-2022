const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  try {
    const user = (await User.find({}))[0];
    const blog = new Blog({
      title,
      author,
      user: user.id,
      url,
      likes,
    });
    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const blog = {
    title: req.body.title,
    likes: req.body.likes,
  };
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
