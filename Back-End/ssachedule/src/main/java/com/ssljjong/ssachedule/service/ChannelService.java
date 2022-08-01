package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelService {

    public List<ChannelDto> getChannelsByUserId(Long userId);
    public List<ChannelDto> getCriticalChannelsByUserId(Long userId);
    public List<ChannelDto> getChannelsByTeamId(String teamId);

}
