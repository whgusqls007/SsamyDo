package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
public class NoticeDto {
    private Long id;
    private String title;
    private String description;
    private Timestamp date;
    private String source;

    public NoticeDto(Long id, String title, String description, Timestamp date, String source) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = source;
    }
}
