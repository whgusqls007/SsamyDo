package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;

public interface ChannelService {

    public List<Channel> getChannelsByUser(User user);

    public List<Channel> getChannelsByTeam(Team team);

}
