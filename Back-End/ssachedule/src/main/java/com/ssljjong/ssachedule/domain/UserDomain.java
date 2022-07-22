package com.ssljjong.ssachedule.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "User")
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
