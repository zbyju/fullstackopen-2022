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
  {
    title: "Important message",
    author: "Jane Dough",
    url: "http://blog.com/blog3",
    likes: 2,
  },
];

const initialUsers = [
  {
    name: "User One",
    username: "userone",
    password: "password",
  },
  {
    name: "User Two",
    username: "usertwo",
    password: "password-2",
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
