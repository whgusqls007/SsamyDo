package com.ssljjong.ssachedule.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String userEmail;
    private int trackId;
    private String userPw;
    private String eduEmail;
    private String eduPw;
}
