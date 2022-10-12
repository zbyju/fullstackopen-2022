import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
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

  render(<Blog blog={blog} />);

  const title = screen.queryByText.("Blog title test");
  expect(element).toBeDefined();
  const element = screen.getByText("Blog title test");
  expect(element).toBeDefined();
});
