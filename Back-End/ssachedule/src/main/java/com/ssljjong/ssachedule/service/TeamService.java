package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.User;

import java.util.List;

public interface TeamService {

    List<TeamDto> getTeamsByUser(Long userId);
}
