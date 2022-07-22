package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserTrack {

    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_email")
    private UserDomain user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="track_id")
    private Track track;

}
