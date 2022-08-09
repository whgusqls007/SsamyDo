package com.ssljjong.ssachedule.controller;

import antlr.Token;
import com.ssljjong.ssachedule.dto.NoticeDto;
import com.ssljjong.ssachedule.dto.TodoDto;
import com.ssljjong.ssachedule.jwt.TokenProvider;
import com.ssljjong.ssachedule.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private TodoService todoService;
    private TokenProvider tokenProvider;

//    @GetMapping("/todolist")
//    @PreAuthorize("hasAnyRole('USER')")
//    public ResponseEntity<Map<String, Object>> getTodosByUser(@RequestHeader String Token) {
//
//        Authentication authentication = tokenProvider.getAuthentication(Token);
//        System.out.println(authentication.getCredentials().toString());
//
//        Map<String, Object> response = new HashMap<>();
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/todolist/{date}")
    public ResponseEntity<Map<String, Object>> getTodosByUser(@PathVariable String date) {

        List<TodoDto> todos = todoService.getTodosFromDate(date);
        Map<String, Object> response = new HashMap<>();

        response.put("data", todos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


