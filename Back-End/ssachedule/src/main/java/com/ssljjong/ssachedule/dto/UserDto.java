package com.ssljjong.ssachedule.dto;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class UserDto {
    private String user_email;
    private String track_id;
    private String mm_email;
    private String mm_pw;
    private String edu_email;
    private String edu_pw;
}
