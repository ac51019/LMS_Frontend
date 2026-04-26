import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import courseReducer from './slices/courseSlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        cart: cartReducer,
        courses: courseReducer,
        blog: blogReducer,
    },
});
