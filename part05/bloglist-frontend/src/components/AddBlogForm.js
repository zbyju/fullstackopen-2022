import { useState } from "react";
import blogService from "../services/blogs";

const AddBlogForm = ({ onCreate, onError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const blog = {
        title,
        author,
        url,
      };

      const newBlog = await blogService.create(blog);

      onCreate(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (err) {
      onError(err);
    }
  }

  return (
    <form className="add-blog-form" onSubmit={handleSubmit}>
      <h1 className="add-blog-form-heading">Create blog</h1>
      <label htmlFor="title">Title: </label>
      <input
        name="title"
        value={title}
        className="add-blog-form-title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label htmlFor="author">Author: </label>
      <input
        name="author"
        value={author}
        className="add-blog-form-author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor="url">Url: </label>
      <input
        name="url"
        value={url}
        className="add-blog-form-url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button>Create</button>
    </form>
  );
};

export default AddBlogForm;
