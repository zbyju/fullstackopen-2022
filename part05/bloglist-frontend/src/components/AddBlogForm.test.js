import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import AddBlogForm from "./AddBlogForm";
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

test("renders title and author, hides url and likes", async () => {
  const createBlogFn = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<AddBlogForm onCreate={createBlogFn} />);

  const title = container.querySelector(".add-blog-form-title");
  const author = container.querySelector(".add-blog-form-author");
  const url = container.querySelector(".add-blog-form-url");
  const submit = container.querySelector(".add-blog-form-submit");

  await user.type(title, "testing the title input");
  await user.type(author, "testing the author input");
  await user.type(url, "testing the url input");
  await user.click(submit);

  expect(createBlogFn.mock.calls).toHaveLength(1);
  expect(createBlogFn.mock.calls[0][0]).toEqual({
    title: "testing the title input",
    author: "testing the author input",
    url: "testing the url input",
  });
});
