package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class ChannelDto {

    private String id;
    private String name;
    private boolean critical;

    public ChannelDto(String id) {
        this.id = id;
    }

    public ChannelDto(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public ChannelDto(String id, String name, boolean critical) {
        this.id = id;
        this.name = name;
        this.critical = critical;
    }
}
