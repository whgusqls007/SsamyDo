package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class ChannelDto {

    private Long id;
    private String name;
    private boolean critical;

    public ChannelDto(Long id) {
        this.id = id;
    }

    public ChannelDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ChannelDto(Long id, String name, boolean critical) {
        this.id = id;
        this.name = name;
        this.critical = critical;
    }
}
