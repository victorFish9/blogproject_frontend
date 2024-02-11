import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import blogsService from "../services/blogs";
import { sendNotification, clearNotification } from "../reducers/notificationReducer";

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()

  const addBlogRedux = async (event) => {
    event.preventDefault()
    const content = {
      title: newBlog,
      author: author,
      url: url,
      likes: 0,
    }
    
    dispatch(createBlog(content))

    dispatch(
      sendNotification({
        message:`Notification: ${content.title} by ${content.author} added succesfuly`,
        type: "success",
        isVisible: true
      })  
    )

    setTimeout(() => {
      dispatch(
        clearNotification()
      )
      window.location.reload()
    }, 5000)

    setNewBlog("");
    setAuthor("");
    setUrl("");
    
  }
  return (
    <div>
      <form onSubmit={addBlogRedux}>
        <label>title</label>
        <input
          id="title"
          value={newBlog}
          onChange={(event) => setNewBlog(event.target.value)}
        />
        <br></br>
        <label>author</label>
        <input
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br></br>
        <label>url</label>
        <input
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <br></br>
        <button type="submit" id="save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
