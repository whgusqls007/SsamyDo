package com.ssljjong.ssachedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id"})
public class TeamUser {

    // Attributes

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserDomain user;

    // Constructors
    public TeamUser(UserDomain user) {
        this.user = user;
    }

    public TeamUser(Team team, UserDomain user) {
        this.team = team;
        this.user = user;
    }

    // Relationship Methods

    public void setTeam(Team team) {
        this.team = team;
    }
}
