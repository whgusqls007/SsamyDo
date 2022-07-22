package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.domain.UserDomain;

public interface UserService {
    public Boolean checkUser(UserDomain userDomain);

    public Boolean setUserEduInfo(UserDomain userDomain);
}
