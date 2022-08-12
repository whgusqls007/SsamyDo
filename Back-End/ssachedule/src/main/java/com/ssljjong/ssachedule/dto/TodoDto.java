package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.Notice;
import com.ssljjong.ssachedule.entity.TodoType;
import lombok.Builder;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Data
@Builder
public class TodoDto {

    private Integer id;

    private Long noticeId;
    private String title;
    private String description;
    private TodoType type;
    private String startDate;
    private String dueDate;

    public TodoDto(Integer id) {
        this.id = id;
    }

    public TodoDto(Integer id, Long noticeId, String title, String description, TodoType type, String startDate, String dueDate) {
        this.id = id;
        this.noticeId = noticeId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDate = startDate;
        this.dueDate = dueDate;

    }
}
