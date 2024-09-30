import { createSlice } from "@reduxjs/toolkit";
import cartsSlice from "./cartsSlice";

const initialState ={
    recipe:null,
}

const recipeSlice = createSlice({
    name:'recipe',
    initialState,
    reducers:{
            setRecipe(state,{payload}){
              state.recipe = payload
            },
        }
    });
export const {setRecipe} = cartsSlice.actions;

export default recipeSlice.reducer;