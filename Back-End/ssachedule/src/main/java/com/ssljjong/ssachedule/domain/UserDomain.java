package com.ssljjong.ssachedule.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "User")
public class UserDomain {
    @Id
    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_pw")
    private String userPw;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    private UserTrack userTrack;

    @Column(name = "edu_email")
    private String eduEmail;

    @Column(name = "edu_pw")
    private String eduPw;

    // 연관 메서드 //

    public void setTrack(Track track) {
        this.userTrack.setTrack(track);
    }
}
