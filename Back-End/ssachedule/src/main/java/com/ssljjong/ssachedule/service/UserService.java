package com.ssljjong.ssachedule.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.aes.AES_Encryption;
import com.ssljjong.ssachedule.dto.LoginDto;
import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.dto.UserListDto;
import com.ssljjong.ssachedule.entity.Authority;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.TeamUser;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.jwt.TokenProvider;
import com.ssljjong.ssachedule.repository.TeamUserRepository;
import com.ssljjong.ssachedule.repository.TrackRepository;
import com.ssljjong.ssachedule.repository.UserRepository;
import com.ssljjong.ssachedule.util.SecurityUtil;

import javassist.bytecode.DuplicateMemberException;
import lombok.RequiredArgsConstructor;
import net.bis5.mattermost.client4.MattermostClient;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final TrackRepository trackRepository;
    private final UserRepository userRepository;
    private final TeamUserRepository teamUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AES_Encryption aes_encryption;
    private final TokenProvider tokenProvider;

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
    public UserDto signup(UserDto userDto) throws Exception {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        net.bis5.mattermost.model.User mmUser = client.login(userDto.getUsername(), userDto.getPassword());
        if (mmUser.getUsername() == null) {
            throw new Exception("매터모스트 계정을 확인하세요");
        }

        Optional<Track> track = trackRepository.findTrackByNameAndGi(userDto.getTrackName(), userDto.getGi());

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .eduPw(aes_encryption.encrypt(userDto.getEduPw()))
                .fcmToken(userDto.getFcmToken())
                .authorities(Collections.singleton(authority))
                .track(track.get())
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
    public void changeTrack(String Authorization, String trackName) {
        User user = findUserByAuthentication(Authorization);
        Track track = trackRepository.findTrackByNameAndGi(trackName, user.getTrack().getGi()).get();
        user.changeTrack(track);
    }

    public void JoinTeam(Team team, User user) {
        TeamUser teamUser = new TeamUser(team, user);
        teamUserRepository.save(teamUser);
    }

    public Optional<User> getUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<UserListDto> getAllUsers() {
        List<UserListDto> userDtos = userRepository.findAll().stream()
                .map(u -> {
                    try {
                        return new UserListDto(u.getUsername(), aes_encryption.decrypt(u.getEduPw()), u.getFcmToken());
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }).collect(Collectors.toList());
        return userDtos;
    }

    public Boolean validateAccount(User userDomain) {
        try {
            client.login(userDomain.getUsername(), userDomain.getPassword());
            return Boolean.TRUE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }

    public LoginDto findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).get();

        return new LoginDto(user.getUsername(), user.getPassword(), user.getEduPw());
    }

    public void deleteUser(String auth) {
        User user = findUserByAuthentication(auth);
        userRepository.delete(user);
    }

    public User findUserByAuthentication(String auth) {
        String token = auth.substring(7);
        Authentication authentication = tokenProvider.getAuthentication(token);
        User user = userRepository.findUserByUsername(authentication.getName()).get();
        return user;
    }
}
