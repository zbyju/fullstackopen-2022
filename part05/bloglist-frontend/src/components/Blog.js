import { useState } from "react";

const Blog = ({ blog, user, onUpdate, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsButtonText = showDetails ? "hide" : "show";

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
            likes: <span className="blog-likes-number">{blog.likes}</span>
            <button className="blog-like-btn" onClick={() => onUpdate(blog)}>
              like
            </button>
          </p>
          <p className="blog-author">{blog.author}</p>
          {user.id === blog.user.id && (
            <button onClick={() => onDelete(blog)} className="blog-delete-btn">
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
