package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TodoDto;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.TodoRepository;
import com.ssljjong.ssachedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;

    @Override
    public List<TodoDto> getTodosByUser(Long userId) {
        List<TodoDto> Todos = todoRepository.findTodosByUser(userId).stream()
                .map(t -> new TodoDto(t.getId(), t.getNotice().getId(), t.getTitle(), t.getDescription(), t.getType(), t.getDueDate()))
                .collect(Collectors.toList());
        return Todos;
    }

    @Override
    public List<TodoDto> getTodosByUserFromDate(Long userId, String dueDate) {
        List<TodoDto> Todos = todoRepository.findTodosByUserAndDueDate(userId, dueDate).stream()
                .map(t -> new TodoDto(t.getId(), t.getNotice().getId(), t.getTitle(), t.getDescription(), t.getType(), t.getDueDate()))
                .collect(Collectors.toList());
        return Todos;

    }

    @Override
    public List<TodoDto> getTodosFromDate(String dueDate) {
        List<TodoDto> Todos = todoRepository.findTodosByDueDate(dueDate).stream()
                .map(t -> new TodoDto(t.getId(), t.getNotice().getId(), t.getTitle(), t.getDescription(), t.getType(), t.getDueDate()))
                .collect(Collectors.toList());
        return Todos;

    }
}
