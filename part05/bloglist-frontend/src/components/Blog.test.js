import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

const user = {
  id: "u123",
  username: "test",
  name: "Test User",
};

const blog = {
  id: "b123",
  title: "Blog title test",
  author: "Test Author",
  user,
  url: "http://test.com/testing",
  likes: 42,
};

test("renders title and author, hides url and likes", () => {
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

test("renders title and author url and likes after clicking show button", async () => {
  const { container } = render(<Blog blog={blog} user={user} />);

  const ue = userEvent.setup();
  const button = container.querySelector(".blog-details-btn");
  expect(button).toBeDefined();
  await ue.click(button);

  const title = container.querySelector(".blog-title");
  expect(title).toBeDefined();
  const author = container.querySelector(".blog-author");
  expect(author).toBeDefined();
  const url = container.querySelector(".blog-url");
  expect(url).toBeDefined();
  const likes = container.querySelector(".blog-likes");
  expect(likes).toBeDefined();
});

test("calls onUpdate when clicking like button", async () => {
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} user={user} onUpdate={mockHandler} />
  );

  const ue = userEvent.setup();
  const detailsBtn = container.querySelector(".blog-details-btn");
  expect(detailsBtn).toBeDefined();
  await ue.click(detailsBtn);

  const likeBtn = container.querySelector(".blog-like-btn");
  expect(likeBtn).toBeDefined();
  await ue.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(1);

  await ue.click(likeBtn);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
