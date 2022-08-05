package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.repository.ChannelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService{

    private final ChannelRepository channelRepository;

    @Override
    public List<ChannelDto> getChannelsByUserId(Long userId) {
        List<ChannelDto> results = channelRepository.findChannelsByUser(userId).stream()
                .map(s -> new ChannelDto(s.getId(), s.getName())).collect(Collectors.toList());
        return results;
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
