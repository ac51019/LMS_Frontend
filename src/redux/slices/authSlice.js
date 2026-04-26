import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../../api/auth.service';

const token = localStorage.getItem('token');
const id = localStorage.getItem('id');
const role = localStorage.getItem('role');

const initialState = {
    isAuthenticated: !!token,
    user: (token && id) ? { id, role, email: localStorage.getItem('email'), name: localStorage.getItem('name') } : null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Contains user details like role, id, etc.
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
