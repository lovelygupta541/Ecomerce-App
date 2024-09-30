import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts : null,
    singleCart : null,
};

const cartsSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCarts(state, {payload}){
            state.carts = payload;
        },
        setSingleCart(state, {payload}){
            state.singleCart = payload;
        },
    },
});

export const {
     setCarts,
     setSingleCart
    } = cartsSlice.actions;

export default cartsSlice.reducer;