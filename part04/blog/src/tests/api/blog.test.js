const mongoose = require("mongoose");
const supertest = require("supertest");
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
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("2 blogs are returned", async () => {
    await api.get("/api/blogs");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
