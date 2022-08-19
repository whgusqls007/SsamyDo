package com.ssljjong.ssachedule.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private String fcmToken;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    @ManyToMany
    @JoinTable(name = "user_authority", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "user_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "authority_name", referencedColumnName = "authority_name") })
    private Set<Authority> authorities;

    // Constructor

    public User(Long id, String username, String password, String eduPw, Track track) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.eduPw = eduPw;
        this.track = track;
    }

    public User(Long id, String username, String userPw, String eduPw) {
        this.id = id;
        this.username = username;
        this.password = userPw;
        this.eduPw = eduPw;
    }

    public User(String username, String userPw, String eduPw) {
        this.username = username;
        this.password = userPw;
        this.eduPw = eduPw;
    }

    public User(Long id, String username, String password, String eduPw, String fcmToken, Set<Authority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.eduPw = eduPw;
        this.fcmToken = fcmToken;
        this.authorities = authorities;
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
