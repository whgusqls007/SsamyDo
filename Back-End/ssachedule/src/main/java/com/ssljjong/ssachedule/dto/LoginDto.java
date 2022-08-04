package com.ssljjong.ssachedule.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
public class LoginDto {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String eduPw;

}
