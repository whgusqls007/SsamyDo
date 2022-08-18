package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class NoticeDto {
    private Integer id;
    private String title;
    private String description;
    private String date;
    private String source;

    private String file_ids;


    public NoticeDto(Integer id, String title, String description, String date, String source, String file_ids) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = source;
        this.file_ids = file_ids;
    }

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
