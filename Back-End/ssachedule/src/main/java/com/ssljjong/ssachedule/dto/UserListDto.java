package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class UserListDto {

    private String username;
    private String eduPw;

    private String fcmToken;

    public UserListDto(String username, String eduPw) {
        this.username = username;
        this.eduPw = eduPw;
    }

    public UserListDto(String username, String eduPw, String fcmToken) {
        this.username = username;
        this.eduPw = eduPw;
        this.fcmToken = fcmToken;
    }
}
