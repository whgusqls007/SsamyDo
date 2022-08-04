package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TodoListDto;

import java.time.LocalDate;
import java.util.List;

public interface TodoService {
    public List<TodoListDto> getTodosByUser(Long userId);

    /**
     * * Find Todos with due date after today based on User
     *
     * @param user UserDomain
     * @return TodoDto List
     */
    public List<TodoListDto> getTodosByUserFromDate(Long userId, LocalDate date);

}
