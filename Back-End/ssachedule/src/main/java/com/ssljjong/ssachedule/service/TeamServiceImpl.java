package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.TeamRepository;
import com.ssljjong.ssachedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;


    @Override
    public List<TeamDto> getTeamsByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        List<TeamDto> teams = teamRepository.findTeamsByUser(user)
                .stream().map(t -> new TeamDto(t.getId(), t.getName())).collect(Collectors.toList());

        return teams;
    }
}
