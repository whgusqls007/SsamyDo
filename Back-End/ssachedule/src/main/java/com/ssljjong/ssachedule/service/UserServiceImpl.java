package com.ssljjong.ssachedule.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.domain.UserDomain;
import com.ssljjong.ssachedule.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import net.bis5.mattermost.client4.MattermostClient;
import net.bis5.mattermost.model.User;

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
    public Boolean checkUser(UserDomain userDomain) {
        User user = client.login(userDomain.getUserEmail(), userDomain.getUserPw());

        if (user.getEmail() == null) {
            return false;
        }

        if (getUser(userDomain.getUserEmail()) == null) {
            userRepository.save(userDomain);
        }

        return true;
    }

    /**
     * @param UserDomain
     * @return Boolean, true when updated successfully, otherwise false
     */
    @Override
    public Boolean setUserEduInfo(UserDomain userDomainParam) {
        UserDomain userDomain = getUser(userDomainParam.getUserEmail());

        if (userDomain == null) {
            return false;
        }

        userDomain.setEduEmail(userDomainParam.getEduEmail());
        userDomain.setEduPw(userDomainParam.getEduPw());

        userRepository.updateOne(userDomain);
        return true;
    }

    /**
     * * Check if the user exists in the database.
     * 
     * @param userEmail
     * @return Boolean
     */
    private UserDomain getUser(String userEmail) {
        UserDomain userDomain = userRepository.findOne(userEmail);
        if (userDomain == null) {
            return null;
        }

        return userDomain;
    }
}
