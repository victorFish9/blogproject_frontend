import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, addLike, user }) => {
  const [visible, setVisible] = useState(false);
  
  const hideWhenVisibile = { display: visible ? "none" : "" };
  const showWhenVisibile = { display: visible ? "" : "none" };


  //
  const dispatch = useDispatch()

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    dispatch(removeBlog(blog.id))
    console.log(blog.id)
  }
  //

  const toggleVisibility = () => {
    setVisible(!visible);
    // console.log(user.username)
  };

  return (
    <div>
      <div style={hideWhenVisibile}>
        <p>{blog.title}</p>{" "}
        <button onClick={toggleVisibility} id="show-more">
          Show more
        </button>
      </div>
      <div style={showWhenVisibile}>
        <button onClick={toggleVisibility}>Show less</button>
        <p>{blog.title}</p>
        {blog.author}
        <br />
        URL: {blog.url}
        <br />
        {blog.likes}{" "}
        <button onClick={() => addLike(blog.id)} id="like">
          like
        </button>{" "}
        <br />
        <p>{blog?.user?.username}</p>
        
        {user === blog?.user?.username && (
         <button onClick={handleDeleteBlog}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
