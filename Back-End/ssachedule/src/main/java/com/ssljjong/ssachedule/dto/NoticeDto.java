package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class NoticeDto {
    private Integer id;
    private String title;
    private String description;
    private String date;

    private String source;


    public NoticeDto(Integer id, String title, String description, String date, String source) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = source;
    }
    public NoticeDto(Integer id, String title, String description, String date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}
