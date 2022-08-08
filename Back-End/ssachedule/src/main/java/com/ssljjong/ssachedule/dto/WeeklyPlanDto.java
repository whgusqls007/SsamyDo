package com.ssljjong.ssachedule.dto;

import com.ssljjong.ssachedule.entity.Track;

public class WeeklyPlanDto {

    private Long id;
    private Track track;
    private String title;
    private String type;
    private String date;
    private String time;

    public WeeklyPlanDto(Long id, Track track, String title, String type, String date, String time) {
        this.id = id;
        this.track = track;
        this.title = title;
        this.type = type;
        this.date = date;
        this.time = time;
    }
}
