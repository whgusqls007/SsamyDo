package com.ssljjong.ssachedule.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class UserTrack {

    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_email")
    private UserDomain user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="track_id")
    private Track track;


    // 연관 메서드 //

}
