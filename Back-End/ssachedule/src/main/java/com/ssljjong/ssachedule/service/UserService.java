package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TrackDto;
import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.entity.*;
import com.ssljjong.ssachedule.util.SecurityUtil;
import com.ssljjong.ssachedule.repository.TeamUserRepository;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import net.bis5.mattermost.client4.MattermostClient;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TeamUserRepository teamUserRepository;
    private final PasswordEncoder passwordEncoder;

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

    /**
     * * Register user on our database
     *
     * @param UserDto contains id, Username, Password, eduPw from Http Request
     * @return UserDto
     *
     */

    @Transactional
    public UserDto signup(UserDto userDto) throws DuplicateMemberException {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .eduPw(passwordEncoder.encode(userDto.getEduPw()))
                .authorities(Collections.singleton(authority))
                .build();

        return UserDto.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String username) {
        return UserDto.from((User) userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
    }

    // 현재 Security Context에 저장된 계정 정보
    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from((User) SecurityUtil.getCurrentUsername()
                .flatMap(userRepository::findOneWithAuthoritiesByUsername).orElse(null));
    }

    /**
     * * Change User's Track
     *
     * @param User userEntity
     *
     * @return true when login success and save info in db successfully otherwise
     *         return false
     */
    @Transactional
    public Boolean changeTrack(User user, Track track) {
        Boolean result = Boolean.FALSE;
        if (user != null) {
            user.changeTrack(track);
            result = Boolean.TRUE;
        }
        return result;
    }

    public void JoinTeam(Team team, User user) {
        TeamUser teamUser = new TeamUser(team, user);
        teamUserRepository.save(teamUser);
    }

    public Optional<User> getUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    public String checkAccount(User userDomain) {
        net.bis5.mattermost.model.User user = client.login(userDomain.getUsername(), userDomain.getPassword());
        return "성공";
    }
}
