package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class UserListDto {

    private Integer id;

    public UserListDto(Integer id) {
        this.id = id;
    }
}
