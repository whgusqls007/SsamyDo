package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class UserListDto {

    private Long id;

    public UserListDto(Long id) {
        this.id = id;
    }
}
