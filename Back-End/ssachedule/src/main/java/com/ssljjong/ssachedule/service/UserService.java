package com.ssljjong.ssachedule.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.repository.UserRepository;

import lombok.RequiredArgsConstructor;

// import com.ssljjong.ssachedule.dao.UserDao;

import net.bis5.mattermost.client4.MattermostClient;
import net.bis5.mattermost.model.User;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

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
    public Boolean getUser(UserDto userDto) {
        User user = client.login(userDto.getUserEmail(), userDto.getUserPw());

        if (user.getEmail() == null) {
            return false;
        }

        userRepository.save(userDto);
        return true;
    }
}
