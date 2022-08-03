import { configureStore } from "@reduxjs/toolkit";
import Todo from "./slice/calendar/ToDo";
import TodoList from "./slice/calendar/TodoList";

const store = configureStore({
  reducer: {
    Todo: Todo.reducer,
    TodoList: TodoList.reducer,
  },
});

export default store;
