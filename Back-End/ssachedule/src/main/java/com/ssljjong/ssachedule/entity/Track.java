package com.ssljjong.ssachedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "name", "gi"})
@Table(name = "track")
public class Track {

    @Id @GeneratedValue
    @Column(name = "track_id")
    private Integer id;

    private String name;
    private Integer gi;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL)
    private List<MonthlyPlan> monthlyPlans = new ArrayList<>();

    public Track(String name, int gi) {
        this.name = name;
        this.gi = gi;
    }
}
