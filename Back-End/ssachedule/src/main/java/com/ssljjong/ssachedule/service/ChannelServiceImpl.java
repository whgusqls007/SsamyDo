package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.repository.ChannelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService{

    private final ChannelRepository channelRepository;

    @Override
    public List<ChannelDto> getChannelsByUserId(Long userId) {
        return channelRepository.findChannelsByUser(userId);
    }

    @Override
    public List<ChannelDto> getCriticalChannelsByUserId(Long userId) {
        return channelRepository.findCriticalChannelsByUser(userId);
    }

    @Override
    public List<ChannelDto> getChannelsByTeamId(String teamId) {
        return channelRepository.findChannelsByTeam(teamId);
    }
}
