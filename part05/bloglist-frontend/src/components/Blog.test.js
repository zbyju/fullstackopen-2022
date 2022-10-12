import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author, hides url and likes", () => {
  const blog = {
    id: "b123",
    title: "Blog title test",
    author: "Test Author",
    user: {
      id: "u123",
      username: "test",
      name: "Test User",
    },
    url: "http://test.com/testing",
    likes: 42,
  };

  const { container } = render(<Blog blog={blog} />);

  const title = container.querySelector(".blog-title");
  expect(title).toBeDefined();
  const author = container.querySelector(".blog-author");
  expect(author).toBeDefined();
  const url = container.querySelector(".blog-url");
  expect(url).toBeNull();
  const likes = container.querySelector(".blog-likes");
  expect(likes).toBeNull();
});
