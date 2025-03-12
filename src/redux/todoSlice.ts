export * from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/todo";

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; id: string }>) => {
      const { id, text } = action.payload;

      const newTodo: ITodo = {
        id,
        text,
        checked: false,
      };

      state.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      const newState = state.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
      );

      return newState;
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) => {
      const newState = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, text: action.payload.newText };
        }

        return todo;
      });

      return newState;
    },
  },
});

export const { addTodo, removeTodo, checkTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
