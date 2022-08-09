package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.Notice;
import com.ssljjong.ssachedule.entity.TodoType;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Data
public class TodoDto {

    private Long id;

    private Long noticeId;
    private String title;
    private String description;
    private TodoType type;
    private String dueDate;

    public TodoDto(Long id, Long noticeId, String title, String description, TodoType type, String dueDate) {
        this.id = id;
        this.noticeId = noticeId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.dueDate = dueDate;
    }
}
