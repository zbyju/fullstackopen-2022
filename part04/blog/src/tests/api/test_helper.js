const Blog = require("../../models/blog");

const initialBlogs = [
  {
    title: "Interesting article",
    author: "John Doe",
    url: "http://blog.com/blog1",
    likes: 10,
  },
  {
    title: "Impressive blog",
    author: "Julia Double",
    url: "http://blog.com/blog2",
    likes: 0,
  },
];

module.exports = {
  initialBlogs,
};
