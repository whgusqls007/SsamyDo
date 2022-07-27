package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id"})
public class UserTrack {

    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserDomain user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="track_id")
    private Track track;


    // 연관 메서드 //

}
