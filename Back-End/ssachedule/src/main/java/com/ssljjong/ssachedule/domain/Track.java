package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Track {

    @Id @GeneratedValue
    @Column(name = "track_id")
    private Long id;


    private String name;
    private int gisu;

    @OneToMany(mappedBy = "member")
    private List<UserDomain> users = new ArrayList<>();

    @OneToMany(mappedBy = "Track", cascade = CascadeType.ALL)
    private List<Monthlyplan> monthlyplans = new ArrayList<>();


}
