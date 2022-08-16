package com.ssljjong.ssachedule.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

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
