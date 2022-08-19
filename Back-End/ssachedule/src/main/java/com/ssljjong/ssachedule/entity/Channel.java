package com.ssljjong.ssachedule.entity;

import static javax.persistence.FetchType.LAZY;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = { "id", "name" })
public class Channel {

    @Id
    @Column(name = "channel_id")
    private String id;

    private String name;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<MMNotice> notices = new ArrayList<>();

    public Channel(String id, String name, Team team) {
        this.id = id;
        this.name = name;
        this.team = team;
    }
}
