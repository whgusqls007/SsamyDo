package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;


    @Override
    public List<TeamDto> getTeamsByUser(Long userId) {
        return teamRepository.findTeamsByUser(userId);
    }
}
