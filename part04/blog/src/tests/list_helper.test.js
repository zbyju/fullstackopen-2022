const listHelper = require("../utils/list_helper");

const blog1 = { title: "t1", author: "a1", url: "u1", likes: 3 };
const blog2 = { title: "t2", author: "a2", url: "u2", likes: 10 };
const blog3 = { title: "t3", author: "a3", url: "u3", likes: 5 };
const blog4 = { title: "t4", author: "a4", url: "u4", likes: 1 };
const blog5 = { title: "t5", author: "a5", url: "u5", likes: 0 };

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("totalLikes", () => {
  test("one blog should be equal to the amount of the likes", () => {
    const res = listHelper.totalLikes([blog1]);
    expect(res).toBe(blog1.likes);
    const res0 = listHelper.totalLikes([blog5]);
    expect(res0).toBe(blog5.likes);
  });

  test("array of blogs should be the sum of the likes", () => {
    const res = listHelper.totalLikes([blog1, blog2, blog3]);
    expect(res).toBe(blog1.likes + blog2.likes + blog3.likes);
  });

  test("empty array should be zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
});

describe("favoriteBlog", () => {
  test("one blog should return that blog", () => {
    const res = listHelper.favoriteBlog([blog1]);
    expect(res).toEqual(blog1);

    const res0 = listHelper.favoriteBlog([blog5]);
    expect(res0).toEqual(blog5);
  });

  test("array of blogs should find the most liked one", () => {
    const res = listHelper.favoriteBlog([blog1, blog2, blog3]);
    expect(res).toEqual(blog2);
  });

  test("empty array should return falsy", () => {
    const res = listHelper.favoriteBlog([]);
    expect(res).toBeFalsy();
  });
});
