package com.ssljjong.ssachedule.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = { "id", "name" })
public class Team {

    @Id
    @Column(name = "team_id")
    private String id;
    private String name;

    @OneToMany(mappedBy = "team")
    private List<TeamUser> teamUsers = new ArrayList<>();

    // Constructors

    public Team(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // Relationship Methods

    public void addTeamUser(TeamUser teamUser) {
        teamUsers.add(teamUser);
        teamUser.setTeam(this);

    }
}
