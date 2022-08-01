package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;

import java.util.List;

public interface TeamService {

    public List<TeamDto> getTeamsByUser(Long userId);

}
