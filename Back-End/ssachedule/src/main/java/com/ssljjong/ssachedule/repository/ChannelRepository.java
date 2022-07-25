package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Channel;
import com.ssljjong.ssachedule.domain.Team;
import com.ssljjong.ssachedule.domain.UserDomain;

import java.util.List;

public interface ChannelRepository {

    public void save(Channel channel);
    public Channel findOne(Long id);
    public List<Channel> findAll();
    public List<Channel> findByTeam(Team team);
    public List<Channel> find   
}
