package com.ssljjong.ssachedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member", uniqueConstraints = {@UniqueConstraint(
        name = "USER-EMAIL_AND_EDU-EMAIL_UNIQUE",
        columnNames = {"user_email", "edu_email"}
)})
public class UserDomain {


    // Attributes
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_pw", nullable = false)
    private String userPw;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    @Column(name = "edu_email", nullable = false)
    private String eduEmail;

    @Column(name = "edu_pw", nullable = false)
    private String eduPw;

    // Constructor

    public UserDomain(Integer id, String userEmail, String userPw, Track track, String eduEmail, String eduPw) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.track = track;
        this.eduEmail = eduEmail;
        this.eduPw = eduPw;
    }

    public UserDomain(Integer id, String userEmail, String userPw, String eduEmail, String eduPw) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.eduEmail = eduEmail;
        this.eduPw = eduPw;
    }

    public UserDomain(String userEmail, String userPw, String eduEmail, String eduPw) {
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.eduEmail = eduEmail;
        this.eduPw = eduPw;
    }
    // 연관 메서드 //

    // 트랙을 바꾸는 메서드
    public void changeTrack(Track track) {
        this.track = track;
    }

    // DB내의 에듀싸피 비밀번호 변경
    public void changeEduPassword(String newPassword) {
        this.eduPw = newPassword;
    }
}
