package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.entity.Todo;
import com.ssljjong.ssachedule.entity.UserDomain;

import java.util.Date;
import java.util.List;

public interface TodoService {

    public List<Todo> findTodos();
    public List<Todo> findTodayTodo(Date date);
    public List<Todo> findUserTodo(UserDomain user);

}
