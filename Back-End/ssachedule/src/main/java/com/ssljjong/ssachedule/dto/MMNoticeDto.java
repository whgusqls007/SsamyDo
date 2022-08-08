package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.Track;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

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
