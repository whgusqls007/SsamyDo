package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeamDto {

    private String id;
    private String name;
    private List<ChannelDto> channels;

    public TeamDto(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamDto(String id, String name, List<ChannelDto> channels) {
        this.id = id;
        this.name = name;
        this.channels = channels;
    }
}
