const router = require("express").Router();
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      id: 1,
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    const blog = new Blog({
      title,
      author,
      user: mongoose.Types.ObjectId(user.id),
      url,
      likes,
    });
    const result = await blog.save();

    user.blogs = user.blogs.concat(result.id);
    await user.save();

    res.status(201).json({
      title: result.title,
      author: result.author,
      url: result.url,
      likes: result.likes,
      id: result._id,
      user: {
        username: user.username,
        id: user.id,
        name: user.name,
      },
    });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: "blog doesn't exist" });
    }

    if (blog.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ error: "attempt at deleting someone else's blog" });
    }
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
    if (updated === null) {
      return res
        .status(400)
        .json({ error: "blog with this id could not be found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
