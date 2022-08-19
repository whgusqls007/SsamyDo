package com.ssljjong.ssachedule.service;

import java.util.Optional;

import com.ssljjong.ssachedule.entity.User;

public interface UserServiceBackup {
    public String checkAccount(User user);

    public void addTeam(User user);

    public void setTrack(User user);

    public Optional<User> getUser(String userEmail);

}
