package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.UserDomain;

import java.util.List;

public interface TeamService {

    public List<TeamDto> getTeamsByUser(UserDomain user);
}
