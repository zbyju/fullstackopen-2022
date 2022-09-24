const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../../app");
const app = require("../../app");
const Blog = require("../../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const promises = helper.initialBlogs.map((b) => {
    const blog = new Blog(b);
    return blog.save();
  });
  await Promise.all(promises);
});

describe("after initial save", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("2 blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the id property is defined", async () => {
    const response = await api.get("/api/blogs");
    for (const blog of response.body) {
      console.log(blog);
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeFalsy();
    }
  });

  test("posting new blog works", async () => {
    const newBlog = {
      title: "Completely new blog",
      author: "Bob New",
      url: "http://blog.com/blogNew",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("posting new blog without likes defaults it to 0", async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Bob New",
      url: "http://blog.com/blogNoLikes",
    };

    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    console.log(response.body);
    expect(response.body.likes).toBe(0);
  });

  test("posting new blog without title returns status 400", async () => {
    const newBlog = {
      author: "No Title Blogger",
      url: "http://blog.com/blogNoTitle",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("posting new blog without author returns status 400", async () => {
    const newBlog = {
      title: "No author blog",
      url: "http://blog.com/blogNoAuthor",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
