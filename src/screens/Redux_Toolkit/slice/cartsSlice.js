import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: null,
    singleCart: null,
    items: [], // Changed 'item' to 'items' for clarity
};

const cartsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCarts(state, { payload }) {
            state.carts = payload;
        },
        setSingleCart(state, { payload }) {
            state.singleCart = payload;
        },
        addCartItem(state, action) {
            const existingItem = state.items.find((i) => i.id === action.payload.id);
            if (existingItem) {
                // If item already exists, increment the quantity
                existingItem.quantity += 1;
            } else {
                // Otherwise, add the new item to the cart
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementItem(state, action) {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementItem(state, action) {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    // Remove item from cart if quantity reaches 0
                    state.items = state.items.filter(i => i.id !== item.id);
                }
            }
        },
    },
});

// Export actions and selectors
export const {
    setCarts,
    setSingleCart,
    addCartItem,
    incrementItem,
    decrementItem
} = cartsSlice.actions;

export const selectedCartItems = (state) => state.cart.items; // Use 'items' instead of 'item'
export default cartsSlice.reducer;
