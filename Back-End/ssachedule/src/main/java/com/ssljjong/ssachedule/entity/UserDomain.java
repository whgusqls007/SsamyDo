package com.ssljjong.ssachedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"userEmail"})
@Table(name = "user")
public class UserDomain {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

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
