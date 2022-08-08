package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;
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
    public List<Channel> getChannelsByUser(User user) {
        return null;
    }

    @Override
    public List<Channel> getChannelsByTeam(Team team) {
        return null;
    }
}
