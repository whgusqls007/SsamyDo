package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class TrackDto {

    private Long id;
    private String name;
    private int gi;

    public TrackDto(Long id, String name, int gi) {
        this.id = id;
        this.name = name;
        this.gi = gi;
    }
}
