package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeamDto {

    private Long id;
    private String name;
    private List<ChannelNameDto> channels;

    public TeamDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamDto(Long id, String name, List<ChannelNameDto> channels) {
        this.id = id;
        this.name = name;
        this.channels = channels;
    }
}
