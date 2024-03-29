import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);


  const reduxNotification = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  const blogFormRef = useRef();



  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("wrong credentials");
      setNotification({ message: "Wrong password or login", type: "error" });
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const addLike = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    console.log("change blog print: ", changedBlog);

    blogService.update(id, changedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    });
  };

  const deleteBlog = (id) => {
    console.log("blog deleted", id);

    try {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    } catch (error) {
      console.log(error, "Error");
    }
  };

  return (
    <div>
      {reduxNotification.message && (
        <div style={{color: reduxNotification.type === "error" ? "red" : "green"}}>
          {reduxNotification.message}
        </div>
      )}
      <h2>Blogs</h2>
      
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <p>Logged as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonlabel="Create new Blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}
      {user &&
        sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
            user={user.username}
          />
        ))}
    </div>
  );
};

export default App;
