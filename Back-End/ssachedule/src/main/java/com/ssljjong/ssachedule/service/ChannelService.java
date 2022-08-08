package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelService {

    public List<Channel> getChannelsByUser(User user);
    public List<Channel> getChannelsByTeam(Team team);

}
