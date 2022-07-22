package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="user_track")
public class Track {

    @Id @GeneratedValue
    @Column(name = "track_id")
    private Long id;

    private String name;
    private int gisu;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserTrack userTrack;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL)
    private List<Monthlyplan> monthlyplans = new ArrayList<>();


}
