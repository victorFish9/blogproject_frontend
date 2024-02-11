import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action){
            state.push(action.payload)
        },
        deleteBlog(state, action){
            const blogIdToDelete = action.payload
            state = state.filter(b => b.id !== blogIdToDelete)
            return state
        },
        setBlog(state, action) {
            return action.payload
        }
    }
})

export const {appendBlog, deleteBlog, setBlog} = blogSlice.actions

export const initializeBlogs = () => {
return async dispatch => {
    const blog = await blogsService.getAll()
    dispatch(setBlog(blog))
}
}

export const createBlog = content => {
return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))}
}

export const removeBlog = id => {
    return async dispatch => {
        try{
            await blogsService.remove(id)
            dispatch(deleteBlog(id))
        } catch (error) {
            console.error('Error deleting blog: ', error)
        }
    }
}


// export const {createBlog} = blogSlice.actions
export default blogSlice.reducer