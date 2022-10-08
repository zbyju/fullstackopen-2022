import { useState, useEffect } from "react";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Togglable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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

  function handleLogin(user) {
    setUser(user);
    setNotification({
      text: "Successfully logged in with username: " + user.username,
    });
  }

  function handleLoginError(err) {
    setNotification({ text: err.response.data.error });
  }

  function handleUpdateError(err) {
    setNotification({ text: err.response.data.error });
  }

  function handleLogout() {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBloglistUser");
    setNotification({ text: "Successfully logged out" });
  }

  function handleCreate(blog) {
    setBlogs(blogs.concat(blog));
    setNotification({ text: "Created new blog with title: " + blog.title });
  }

  function handleUpdate(blog) {
    const newBlogs = blogs.map((b) => {
      if (b.id !== blog.id) return b;
      return blog;
    });
    setBlogs(newBlogs);
    setNotification({ text: "Updated blog with title: " + blog.title });
  }

  function handleDelete(id) {
    const newBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(newBlogs);
    setNotification({ text: "Successfully deleted blog" });
  }

  function handleCreateError(err) {
    setNotification({ text: err });
  }

  function handleNotificationDelete() {
    setNotification(null);
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification
        notification={notification}
        onDelete={handleNotificationDelete}
      />

      {user === null ? (
        <LoginForm onLogin={handleLogin} onError={handleLoginError} />
      ) : (
        <>
          <p>
            You are logged in as: {user.username}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <AddBlogForm onCreate={handleCreate} onError={handleCreateError} />
          </Togglable>
        </>
      )}

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onError={handleUpdateError}
        />
      ))}
    </div>
  );
};

export default App;
