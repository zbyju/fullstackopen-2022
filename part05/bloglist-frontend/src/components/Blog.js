import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdate, onError }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsButtonText = () => (showDetails ? "hide" : "show");

  async function handleLike() {
    try {
      const newBlog = await blogService.like(blog);
      onUpdate(newBlog);
    } catch (err) {
      onError(err);
    }
  }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title}
        <button onClick={() => setShowDetails(!showDetails)}>
          {detailsButtonText()}
        </button>
      </h3>

      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
