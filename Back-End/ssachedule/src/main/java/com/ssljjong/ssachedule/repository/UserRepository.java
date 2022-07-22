package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.UserDomain;

public interface UserRepository {
    public void save(UserDomain userDomain);

    public UserDomain findOne(String email);

    public void updateOne(UserDomain userDomain);
}
