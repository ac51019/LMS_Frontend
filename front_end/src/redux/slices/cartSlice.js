import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    cartTotal: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.course_id === action.payload.course_id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                state.cartTotal = state.cartItems.length;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.course_id !== action.payload.course_id);
            state.cartTotal = state.cartItems.length;
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotal = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
