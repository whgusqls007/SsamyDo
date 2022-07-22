package com.ssljjong.ssachedule.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.repository.UserRepository;

// import com.ssljjong.ssachedule.dao.UserDao;

import net.bis5.mattermost.client4.MattermostClient;
import net.bis5.mattermost.model.User;

@Service
public class UserService {
    @Autowired
    UserDto userDto;

    @Autowired
    UserRepository userRepository;
    // @Autowired
    // UserDao UserDao;

    MattermostClient client;

    /**
     * * Build MattermostClient
     */
    public UserService() {
        client = MattermostClient.builder()
                .url("https://meeting.ssafy.com")
                // .logLevel(Level.INFO)
                .ignoreUnknownProperties()
                .build();
    }

    /**
     * * Login into MattermostClient using Email, Password
     * 
     * @param email mattermost email
     * @param pw    mattermost password
     * @return true when login success and save info in db successfully otherwise
     *         return false
     */
    public Boolean getUser(UserDto userDto) {
        User user = client.login(userDto.getMm_email(), userDto.getMm_pw());

        if (user.getEmail() == null) {
            return false;
        }

        userRepository.save(userDto);
        return true;
    }
}
