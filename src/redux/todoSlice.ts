export * from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/todo";

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: ITodo = {
        text: action.payload,
        checked: false,
      };

      state.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.text !== action.payload);
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      const newState = state.map((todo) =>
        todo.text === action.payload
          ? { ...todo, checked: !todo.checked }
          : todo
      );

      return newState;
    },
  },
});

export const { addTodo, removeTodo, checkTodo } = todoSlice.actions;
export default todoSlice.reducer;
