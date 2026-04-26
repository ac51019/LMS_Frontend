import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get base URL pointing to Spring Boot backend
const API_URL = 'http://localhost:8080/api/blogs';

// Token setup for axios
const setAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchBlogById = createAsyncThunk('blog/fetchBlogById', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchComments = createAsyncThunk('blog/fetchComments', async (blogId, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/${blogId}/comments`);
        return { blogId, comments: response.data };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createBlog = createAsyncThunk('blog/createBlog', async (blogData, thunkAPI) => {
    try {
        setAuthToken();
        const response = await axios.post(API_URL, blogData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateBlogItem = createAsyncThunk('blog/updateBlog', async ({ id, blogData }, thunkAPI) => {
    try {
        setAuthToken();
        const response = await axios.put(`${API_URL}/${id}`, blogData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteBlogItem = createAsyncThunk('blog/deleteBlog', async (id, thunkAPI) => {
    try {
        setAuthToken();
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteCommentItem = createAsyncThunk('blog/deleteCommentItem', async (id, thunkAPI) => {
    try {
        setAuthToken();
        await axios.delete(`${API_URL}/comments/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const reactToBlog = createAsyncThunk('blog/reactToBlog', async ({ blogId, commentId, reactionType }, thunkAPI) => {
    try {
        setAuthToken();
        await axios.post(`${API_URL}/reactions`, { blogId, commentId, reactionType });
        // After Reaction, the realtime websocket will push the updated blog stats
        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addCommentItem = createAsyncThunk('blog/addComment', async ({ blogId, parentCommentId, content }, thunkAPI) => {
    try {
        setAuthToken();
        const response = await axios.post(`${API_URL}/comments`, { blogId, parentCommentId, content });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
    blogs: [],
    currentBlog: null,
    comments: [],
    status: 'idle',
    error: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        // Reducers for realtime sync
        blogUpdated: (state, action) => {
            const updatedBlog = action.payload;
            const index = state.blogs.findIndex(b => b.id === updatedBlog.id);
            if (index !== -1) {
                state.blogs[index] = updatedBlog;
            } else {
                state.blogs.unshift(updatedBlog);
            }
            if (state.currentBlog && state.currentBlog.id === updatedBlog.id) {
                state.currentBlog = updatedBlog;
            }
        },
        blogDeleted: (state, action) => {
            const id = action.payload;
            state.blogs = state.blogs.filter(b => b.id !== id);
            if (state.currentBlog && state.currentBlog.id === id) {
                state.currentBlog = null;
            }
        },
        commentAddedOrUpdated: (state, action) => {
            // We just re-fetch comments generally, or append accurately
            // Assuming simple fetch for full sync or simple append
            const comment = action.payload;
            if (state.currentBlog && state.currentBlog.id === comment.blogId) {
                // If top-level
                if (!comment.parentCommentId) {
                    const idx = state.comments.findIndex(c => c.id === comment.id);
                    if (idx !== -1) {
                        state.comments[idx] = comment;
                    } else {
                        state.comments.push(comment);
                    }
                } else {
                    // It's a reply, might require nested search. Simpler: we listen and refetch comments if we are on the current blog route.
                }
            }
        },
        commentDeleted: (state, action) => {
            const id = action.payload;
            // recursively remove from state.comments (simpler to trigger a refetch or implement recursive filtering)
            // But we can filter root level
            state.comments = state.comments.filter(c => c.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch Current Blog
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.currentBlog = action.payload;
            })
            // Fetch Comments
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload.comments;
            })
    }
});

export const { blogUpdated, blogDeleted, commentAddedOrUpdated, commentDeleted } = blogSlice.actions;
export default blogSlice.reducer;
