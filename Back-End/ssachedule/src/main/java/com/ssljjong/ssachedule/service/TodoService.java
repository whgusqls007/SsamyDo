package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TodoDto;
import com.ssljjong.ssachedule.entity.Todo;

import java.time.LocalDate;
import java.util.List;

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
