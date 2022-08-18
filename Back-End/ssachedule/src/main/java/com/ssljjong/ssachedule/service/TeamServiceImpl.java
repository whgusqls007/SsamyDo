package com.ssljjong.ssachedule.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.repository.TeamRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    @Override
    public List<TeamDto> getTeamsByUser(Long userId) {
        List<TeamDto> teams = teamRepository.findTeamsByUser(userId)
                .stream().map(t -> new TeamDto(t.getId(), t.getName())).collect(Collectors.toList());

        return teams;
    }
}
