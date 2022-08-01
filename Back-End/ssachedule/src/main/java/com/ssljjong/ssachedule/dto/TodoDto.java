package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.TodoType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoDto {

    private Long id;
    private String title;
    private String description;
    private TodoType type;
    private LocalDate dueDate;

    public TodoDto(Long id, String title, String description, TodoType type, LocalDate dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.dueDate = dueDate;
    }
}
