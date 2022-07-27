package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.entity.UserDomain;

public interface UserService {
    public Boolean checkUser(UserDomain userDomain);

    public Boolean setUserEduInfo(UserDomain userDomain);
}
