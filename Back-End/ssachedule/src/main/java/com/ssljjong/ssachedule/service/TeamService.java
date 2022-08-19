package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.dto.TeamDto;

public interface TeamService {

    List<TeamDto> getTeamsByUser(Long userId);
}
