package com.ssljjong.ssachedule.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "user")
public class UserDto {
    @Id
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "track_id")
    private int trackId;

    @Column(name = "user_pw")
    private String userPw;

    @Column(name = "edu_email")
    private String eduEmail;

    @Column(name = "edu_pw")
    private String eduPw;
}
