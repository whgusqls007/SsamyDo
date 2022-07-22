package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="User")
public class UserDomain {
    @Id
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_pw")
    private String userPw;

    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    @Column(name = "edu_email")
    private String eduEmail;

    @Column(name = "edu_pw")
    private String eduPw;


}
