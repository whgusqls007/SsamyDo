package com.ssljjong.ssachedule.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.dto.TodoDto;
import com.ssljjong.ssachedule.entity.Todo;
import com.ssljjong.ssachedule.repository.TodoRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public List<TodoDto> getTodosByUser(Long userId) {
        List<TodoDto> Todos = todoRepository.findTodosByUser(userId).stream()
                .map(t -> new TodoDto(t.getId(), t.getNotice().getId(), t.getTitle(), t.getDescription(), t.getType(),
                        t.getStartDate(), t.getDueDate()))
                .collect(Collectors.toList());
        return Todos;
    }

    @Override
    public List<TodoDto> getTodosByUserFromDate(Long userId, String dueDate) {
        List<TodoDto> Todos = todoRepository.findTodosByUserAndDueDate(userId, dueDate).stream()
                .map(t -> new TodoDto(t.getId(), t.getNotice().getId(), t.getTitle(), t.getDescription(), t.getType(),
                        t.getStartDate(), t.getDueDate()))
                .collect(Collectors.toList());
        return Todos;

    }

    @Override
    public List<Todo> getTodosFromDate() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String today = simpleDateFormat.format(new Date());
        List<Todo> todos = todoRepository.findTodosByDueDate(today);
        return todos;

    }
}
