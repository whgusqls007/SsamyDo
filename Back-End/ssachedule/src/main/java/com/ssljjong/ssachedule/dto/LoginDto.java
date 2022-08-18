package com.ssljjong.ssachedule.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class LoginDto {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String eduPw;

    public LoginDto(String username, String password, String eduPw) {
        this.username = username;
        this.password = password;
        this.eduPw = eduPw;
    }
}
