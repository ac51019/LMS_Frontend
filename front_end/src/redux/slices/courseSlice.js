import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseService } from '../../api/course.service';

export const fetchAllCourses = createAsyncThunk(
    'courses/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await courseService.getAllCourses();
            if (response.success) {
                return response.data;
            }
            return rejectWithValue(response.error);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default courseSlice.reducer;
