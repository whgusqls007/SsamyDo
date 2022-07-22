package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Team {

    @Id
    @Column(name="team_id")
    private Long teamId;

    private String name;


}
