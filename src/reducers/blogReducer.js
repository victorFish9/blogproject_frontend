import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action){
            state.push(action.payload)
        },
    }
})

export const {appendBlog} = blogSlice.actions

export const createBlog = content => {
return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))}
}


// export const {createBlog} = blogSlice.actions
export default blogSlice.reducer