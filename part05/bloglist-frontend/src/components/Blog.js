import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, onUpdate, onDelete, onError }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsButtonText = showDetails ? "hide" : "show";

  async function handleLike() {
    try {
      const newBlog = await blogService.like(blog);
      onUpdate(newBlog);
    } catch (err) {
      onError(err);
    }
  }

  async function handleDelete() {
    if (
      !window.confirm("Do you really want to delete blog: " + blog.title + "?")
    ) {
      return;
    }
    try {
      await blogService.remove(blog.id);
      onDelete(blog.id);
    } catch (err) {
      onError(err);
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <h3 className="blog-title">
        {blog.title}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="blog-details-btn"
        >
          {detailsButtonText}
        </button>
      </h3>

      {showDetails && (
        <>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes: {blog.likes}{" "}
            <button className="blog-like-btn" onClick={handleLike}>
              like
            </button>
          </p>
          <p className="blog-author">{blog.author}</p>
          {user.id === blog.user.id && (
            <button onClick={handleDelete} className="blog-delete-btn">
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
