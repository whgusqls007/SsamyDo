package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class NoticeDto {
    private Long id;
    private String title;
    private String description;
    private String date;

    public NoticeDto(Long id, String title, String description, String date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}
