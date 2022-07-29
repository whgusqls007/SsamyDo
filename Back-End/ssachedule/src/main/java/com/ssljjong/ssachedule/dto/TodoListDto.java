package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.TodoType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoListDto {

    private Long id;
    private String title;
    private TodoType type;
    private LocalDate dueDate;


    public TodoListDto(Long id, String title, TodoType type, LocalDate dueDate) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.dueDate = dueDate;
    }
}