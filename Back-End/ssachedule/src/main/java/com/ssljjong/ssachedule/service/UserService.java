package com.ssljjong.ssachedule.service;


import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.entity.Authority;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.util.SecurityUtil;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.entity.User;
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
    public String checkAccount(User userDomain) {
        net.bis5.mattermost.model.User user = client.login(userDomain.getUsername(), userDomain.getPassword());
        return "성공";

//        if (user.getEmail() == null) {
//            return false;
//        }

    }

    public void addTeam(User user) {

    }

    public void setTrack(User user) {

    }
    public Optional<User> getUser(String username){
        return userRepository.findUserByUsername(username);
    }



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
        return UserDto.from((User) SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername).orElse(null));
    }

    @Transactional
    public Boolean changeTrack(Optional<User> user, Track track) {
        Boolean result = Boolean.FALSE;
        if (user!=null) {
            User u = user.get();
            u.changeTrack(track);
            result = Boolean.TRUE;
        }
        return result;
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
