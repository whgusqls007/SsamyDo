package com.ssljjong.ssachedule.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.ChannelRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

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
