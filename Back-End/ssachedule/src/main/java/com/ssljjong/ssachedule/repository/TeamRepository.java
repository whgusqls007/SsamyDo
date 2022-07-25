package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Team;
import com.ssljjong.ssachedule.domain.UserDomain;

import java.util.List;

public interface TeamRepository {

    public void save(Team team);
    public Team findOne(Long id);
    public List<Team> findAll();
    public List<Team> findByUser(UserDomain user);

}
