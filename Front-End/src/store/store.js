import { configureStore } from "@reduxjs/toolkit";
import example from "./example/examSlice";
import Todo from "./slice/calendar/ToDo";
import TodoList from "./slice/calendar/TodoList";

const store = configureStore({
  reducer: {
    example: example.reducer,
    Todo: Todo.reducer,
    TodoList: TodoList.reducer,
  },
});

export default store;
