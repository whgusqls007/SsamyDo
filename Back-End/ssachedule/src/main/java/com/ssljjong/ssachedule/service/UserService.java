package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.UserDomain;

import java.util.List;

public interface UserService {
    public Boolean checkUser(UserDomain userDomain);
    public Boolean setUserEduInfo(UserDomain userDomain);


}
