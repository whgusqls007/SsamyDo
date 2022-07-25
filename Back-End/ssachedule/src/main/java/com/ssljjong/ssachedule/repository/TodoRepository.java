package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Todo;

import java.util.Date;
import java.util.List;

public interface TodoRepository {
    public  void save(Todo todo);
    public  Todo findOne(Long id);
    public List<Todo> findAll();

    public List<Todo> findByDue(Date dueDate);
}
