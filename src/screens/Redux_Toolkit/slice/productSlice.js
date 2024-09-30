import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : null,
    singleProduct : null,
};

const productSlilce = createSlice({
    name:'product',
    initialState,
    reducers:{
        setProducts(state, {payload}){
            state.products = payload;
        },
        setSingleProduct(state, {payload}){
            state.singleProduct = payload;
        },
    },
});

export const {setProducts, setSingleProduct} = productSlilce.actions;

export default productSlilce.reducer;