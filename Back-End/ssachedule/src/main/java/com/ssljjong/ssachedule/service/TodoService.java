package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.dto.TodoDto;
import com.ssljjong.ssachedule.entity.Todo;

public interface TodoService {
    List<TodoDto> getTodosByUser(Long userId);

    /**
     * * Find Todos with due date after today based on User
     *
     * @param user UserDomain
     * @return TodoDto List
     */

    List<TodoDto> getTodosByUserFromDate(Long userId, String dueDate);

    List<Todo> getTodosFromDate();
}
