package com.ssljjong.ssachedule.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.entity.Todo;
import com.ssljjong.ssachedule.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/todolist")
    public ResponseEntity<Map<String, Object>> getTodos() {
        List<Todo> todos = todoService.getTodosFromDate();
        Map<String, Object> response = new HashMap<>();
        response.put("data", todos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
