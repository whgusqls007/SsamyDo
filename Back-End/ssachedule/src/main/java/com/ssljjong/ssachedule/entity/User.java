package com.ssljjong.ssachedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssljjong.ssachedule.dto.TrackDto;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(name = "USERNAME", columnNames = { "username" }) })
public class User {

    // Attributes
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "edu_pw")
    private String eduPw;

    @Column(name = "fcmtoken")
    private String fcmtoken;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    // @Column(name = "activated")
    // private boolean activated;

    @ManyToMany
    @JoinTable(name = "user_authority", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "user_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "authority_name", referencedColumnName = "authority_name") })
    private Set<Authority> authorities;

    // Constructor

    public User(Long id, String username, String password, String eduPw, Track track, String fcmtoken) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.eduPw = eduPw;
        this.track = track;
        this.fcmtoken = fcmtoken;
    }

    public User(Long id, String username, String userPw, String eduPw, String fcmtoken) {
        this.id = id;
        this.username = username;
        this.password = userPw;
        this.eduPw = eduPw;
        this.fcmtoken = fcmtoken;
    }

    public User(String username, String userPw, String eduPw, String fcmtoken) {
        this.username = username;
        this.password = userPw;
        this.eduPw = eduPw;
        this.fcmtoken = fcmtoken;
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
