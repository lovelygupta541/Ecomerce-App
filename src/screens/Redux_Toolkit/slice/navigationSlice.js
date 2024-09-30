import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    focusedStackScreen : null,
};

const navigationSlice = createSlice({
    name:'navigation',
    initialState,
    reducers:{
        setFocusedStackScreens(state, {payload}){
            state.focusedStackScreen = payload;
        },
    },
});

export const {setFocusedStackScreens} = navigationSlice.actions;

export default navigationSlice.reducer;