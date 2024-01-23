import { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)


  const hideWhenVisibile = { display: visible ? 'none' : '' }
  const showWhenVisibile = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    // console.log(user.username)
  }


  return (
    <div>
      <div style={hideWhenVisibile} >
        <p>{blog.title}</p>  <button onClick={toggleVisibility}>Show more</button>
      </div>
      <div style={showWhenVisibile}>
        <button onClick={toggleVisibility}>Show less</button>
        {blog.title}<br />
        {blog.author}<br />
        URL: {blog.url}<br />
        {blog.likes} <button onClick={() => addLike(blog.id)}>like</button> <br />
        <p>{blog?.user?.username}</p>
        {user === blog?.user?.username && <button onClick={() => deleteBlog(blog.id)}>delete</button>}

      </div>
    </div>
  )
}

export default Blog