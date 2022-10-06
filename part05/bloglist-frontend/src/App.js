import { useState, useEffect } from "react";
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
    }
  }, []);

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
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
        </>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
