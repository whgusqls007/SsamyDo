import { configureStore } from "@reduxjs/toolkit";
import example from "./example/examSlice";
import Todo from "./slice/calendar/ToDo";
import TodoList from "./slice/calendar/TodoList";
import MainTodo from "./slice/main/MainTodo";

const store = configureStore({
  reducer: {
    example: example.reducer,
    Todo: Todo.reducer,
    TodoList: TodoList.reducer,
    MainTodo: MainTodo.reducer,
  },
});

export default store;
