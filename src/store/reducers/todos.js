import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api";

// the outside "thunk creator" function
export const fetchTodos = createAsyncThunk("todos/fetchAll", () =>
  todoAPI.fetchAll()
);
export const deleteTodo = createAsyncThunk("todo/delete", (id) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  const response = todoAPI.deleteOne(id);
  const todo = response.data;
  return todo;
});
export const updateTodo = createAsyncThunk("todo/update", (payload) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  const response = todoAPI.updateOne(payload.id, {
    id: payload.id,
    state: payload.state,
    text: payload.text,
    title: payload.title,
  });
  const todo = response.data;
  return todo;
});
export const addTodo = createAsyncThunk("todo/add", (todo) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  const response = todoAPI.createOne(todo);
  const todos = response.data;
  return todos;
});

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      if (index !== -1) state.splice(index, 1);
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      // TODO: Finish the code for adding todo
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      state[index] = action.payload;
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      // TODO: Finish the code for updating todo
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      state[index] = action.payload;
    });
  },
});

export default todosSlice.reducer;
