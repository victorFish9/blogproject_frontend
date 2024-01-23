import { useState } from "react"

const BlogForm = ({ createBlog }) => {

    const [newBlog, setNewBlog] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        console.log('new blog form sended to backend')
        createBlog({
            title: newBlog,
            author: author,
            url: url,
            likes: 0
        })
        setNewBlog('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <label>title</label>
                <input value={newBlog} onChange={event => setNewBlog(event.target.value)} /><br></br>
                <label>author</label>
                <input value={author} onChange={event => setAuthor(event.target.value)} /><br></br>
                <label>url</label>
                <input value={url} onChange={event => setUrl(event.target.value)} /><br></br>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default BlogForm