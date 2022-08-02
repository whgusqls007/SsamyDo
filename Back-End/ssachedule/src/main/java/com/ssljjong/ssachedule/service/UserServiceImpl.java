package com.ssljjong.ssachedule.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.entity.UserDomain;
import com.ssljjong.ssachedule.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import net.bis5.mattermost.client4.MattermostClient;
import net.bis5.mattermost.model.User;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    MattermostClient client = MattermostClient.builder()
            .url("https://meeting.ssafy.com")
            // .logLevel(Level.INFO)
            .ignoreUnknownProperties()
            .build();
    /**
     * * Login into MattermostClient using Email, Password
     *
     * @param email mattermost email
     * @param pw    mattermost password
     * @return true when login success and save info in db successfully otherwise
     *         return false
     */
    @Override
    public String checkAccount(UserDomain userDomain) {
        User user = client.login(userDomain.getUserEmail(), userDomain.getUserPw());
        return "성공";

//        if (user.getEmail() == null) {
//            return false;
//        }

    }

    @Override
    public void addTeam(UserDomain user) {

    }

    @Override
    public void setTrack(UserDomain user) {

    }


    public Optional<UserDomain> getUser(String userEmail){
        return userRepository.findUserByUserEmail(userEmail);
    }

//
//

//
//    /**
//     * @param UserDomain

//     * @return Boolean, true when updated successfully, otherwise false
//     */
//    @Override
//    public Boolean setUserEduInfo(UserDomain userDomainParam) {
//        UserDomain userDomain = getUser(userDomainParam.getUserEmail());
//
//        if (userDomain == null) {
//            return false;
//        }
//
//        userDomain.setEduEmail(userDomainParam.getEduEmail());
//        userDomain.setEduPw(userDomainParam.getEduPw());
//
//        userRepository.updateOne(userDomain);
//        return true;
//    }
//
//    /**
//     * * Check if the user exists in the database.
//     *
//     * @param userEmail
//     * @return Boolean
//     */

}
