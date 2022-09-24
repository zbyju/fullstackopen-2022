const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);

  try {
    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
