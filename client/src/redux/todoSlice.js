import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todo: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo: (state, action) => {
            const { data } = action.payload;
            state.todo = data;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTodo } = todoSlice.actions;

export default todoSlice.reducer;
