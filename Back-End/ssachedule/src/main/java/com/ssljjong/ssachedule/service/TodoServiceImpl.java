package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TodoListDto;
import com.ssljjong.ssachedule.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;

    @Override
    public List<TodoListDto> getTodosByUser(Long userId) {
        List<TodoListDto> result = todoRepository.findTodoListByUserId(userId);
        return result;
    }

    @Override
    public List<TodoListDto> getTodosByUserFromDate(Long userId, LocalDate date) {
        List<TodoListDto> result = todoRepository.findTodoListFromDateByUserId(userId, date);
        return result;
    }
}
