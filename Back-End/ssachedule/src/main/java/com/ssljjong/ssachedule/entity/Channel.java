package com.ssljjong.ssachedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "name", "critical"})
public class Channel {

    @Id
    @Column(name="channel_id")
    private String id;

    private String name;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private boolean critical;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<Todo> todoList = new ArrayList<>();

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<MMNotice> notices = new ArrayList<>();

    public Channel(String id, String name, Team team) {
        this.id = id;
        this.name = name;
        this.team = team;
    }
}
