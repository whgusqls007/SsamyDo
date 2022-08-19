package com.ssljjong.ssachedule.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class MMNoticeDto {
    private Long id;
    private String title;
    private String description;
    private Timestamp date;
    private String source;

    public MMNoticeDto(Long id, String title, String description, Timestamp date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = "M";
    }
}
