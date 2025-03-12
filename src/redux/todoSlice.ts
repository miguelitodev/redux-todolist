export * from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/todo";
import { toast } from "sonner";

const initialState: ITodo[] = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos")!)
  : [];

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
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState));

      return newState;
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      const newState = state.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newState));

      return newState;
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) => {
      if (action.payload.newText === "") {
        const newState = state.filter((todo) => todo.id !== action.payload.id);
        toast.warning(
          "Voce apagou todo o conteudo e entao deletamos a nota, se deseja adicionar uma nova use o campo indicado!"
        );
        return newState;
      } else {
        const newState = state.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.newText };
          }
          return todo;
        });

        localStorage.setItem("todos", JSON.stringify(newState));
        return newState;
      }
    },
  },
});

export const { addTodo, removeTodo, checkTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
