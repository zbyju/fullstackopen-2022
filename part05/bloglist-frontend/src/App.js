import { useState, useEffect } from "react";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  function handleLogout() {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBloglistUser");
  }

  function handleCreate(blog) {
    setBlogs(blogs.concat(blog));
  }

  return (
    <div>
      <h2>blogs</h2>

      {user === null ? (
        <LoginForm onLogin={(user) => setUser(user)} />
      ) : (
        <>
          <p>
            You are logged in as: {user.username}
            <button onClick={handleLogout}>logout</button>
          </p>
          <AddBlogForm onCreate={handleCreate} />
        </>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
