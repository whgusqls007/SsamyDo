package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class WeeklyPlanDto {

    private Long id;
    private String title;
    private String date;
    private String time;

    public WeeklyPlanDto(Long id, String title, String date, String time) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
    }
}
