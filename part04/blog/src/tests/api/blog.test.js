const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../../app");
const app = require("../../app");
const Blog = require("../../models/blog");
const User = require("../../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const promisesUsers = helper.initialUsers.map((u) => {
    const user = new User(u);
    return user.save();
  });
  const usersAdded = await Promise.all(promisesUsers);
  const userId = usersAdded[0].id;

  const promisesBlogs = helper.initialBlogs.map((b) => {
    const blog = new Blog({ ...b, user: userId });
    return blog.save();
  });
  await Promise.all(promisesBlogs);
});

describe("fetch and save after initial save", () => {
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
});

describe("saving incomplete blogs", () => {
  test("posting new blog without likes defaults it to 0", async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Bob New",
      url: "http://blog.com/blogNoLikes",
    };

    const response = await api.post("/api/blogs").send(newBlog).expect(201);
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

describe("deleting blogs", () => {
  test("deleting existing blog works", async () => {
    const blogsBefore = await helper.blogsInDb();
    const blog = blogsBefore[0];

    await api.delete("/api/blogs/" + blog.id).expect(204);

    const blogsAfter = await helper.blogsInDb();

    expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
  });
});

describe("updating blogs", () => {
  test("updating existing blog works", async () => {
    const blogBefore = (await helper.blogsInDb())[0];
    const changed = {
      title: "Changed title",
      likes: blogBefore.likes + 1,
    };
    const response = await await api
      .put("/api/blogs/" + blogBefore.id)
      .send(changed);
    const blog = response.body;
    blog.author = blog.author.toString();

    const blogAfter = (await helper.blogsInDb())[0];

    expect(blog).toEqual(blogAfter);
    expect(blog.title).toBe(changed.title);
    expect(blog.likes).toBe(changed.likes);
    expect(blog.author).toBe(blogBefore.author);
    expect(blog.url).toBe(blogBefore.url);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
