const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../../app");
const app = require("../../app");
const User = require("../../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const promises = helper.initialUsers.map((b) => {
    const user = new User(b);
    return user.save();
  });
  await Promise.all(promises);
});

describe("fetch and save after initial save", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct amount of users are returned", async () => {
    const response = await api.get("/api/users");

    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test("the id property is defined and no passwords are present", async () => {
    const response = await api.get("/api/users");
    for (const user of response.body) {
      expect(user.id).toBeDefined();
      expect(user._id).toBeFalsy();
      expect(user.password).toBeFalsy();
    }
  });

  test("posting new user works", async () => {
    const newUser = {
      name: "New User",
      username: "iamnew",
      password: "mypassword",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.initialUsers.length + 1);
  });
});

describe("saving users with missing/wrong fields results in error", () => {
  test("posting new user with short username", async () => {
    const newUser = {
      name: "Another user",
      username: "xx",
      password: "mypassword",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();
  });

  test("posting new user with used username", async () => {
    const newUser = {
      name: "New User",
      username: "iamnew",
      password: "mypassword",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();
  });

  test("posting new user with short password", async () => {
    const newUser = {
      name: "Yet Another User",
      username: "iamverynew",
      password: "xx",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
