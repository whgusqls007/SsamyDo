package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class TeamUser {

    @Id
    @GeneratedValue
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email")
    private UserDomain user;
}
