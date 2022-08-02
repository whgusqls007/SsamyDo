package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.UserDomain;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public String checkAccount(UserDomain user);
    public void addTeam(UserDomain user);
    public void setTrack(UserDomain user);
    public Optional<UserDomain> getUser(String userEmail);



}
