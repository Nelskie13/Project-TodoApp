import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api";

// the outside "thunk creator" function
export const fetchTodos = createAsyncThunk("todos/fetchAll", () =>
  todoAPI.fetchAll()
);
export const deleteTodo = createAsyncThunk("todo/delete", (id) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  return todoAPI.deleteOne(id);
});
export const updateTodo = createAsyncThunk("todo/update", (payload) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  return todoAPI.updateOne(payload.id, {
    id: payload.id,
    state: payload.state,
    text: payload.text,
    title: payload.title,
  });
});
export const addTodo = createAsyncThunk("todo/add", (todo) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  return todoAPI.createOne(todo);
});

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const newTodos = action.payload.filter(
        (newTodo) => !state.find((todo) => todo.id === newTodo.id)
      );
      return [...state, ...newTodos];
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      const newTodo = action.payload;
      return [...state, newTodo];
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      return state.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    });
  },
});

export default todosSlice.reducer;
