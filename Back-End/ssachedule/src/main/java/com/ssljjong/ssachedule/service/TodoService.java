package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.domain.Todo;
import com.ssljjong.ssachedule.domain.UserDomain;
import com.ssljjong.ssachedule.repository.TodoRepository;

import java.util.Date;
import java.util.List;

public interface TodoService {

    public List<Todo> findTodos();
    public List<Todo> findTodayTodo(Date date);
    public List<Todo> findUserTodo(UserDomain user);

}
