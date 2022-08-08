package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.TrackRepository;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TrackRepository trackRepository;

    @GetMapping("/test")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("test");
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto) throws Exception {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/track/change")
    @PreAuthorize("hasAnyRole('USER')")

    public ResponseEntity<String> changeTrack(@RequestBody UserDto userDto, @RequestBody String trackName,
            @RequestBody int gi) {

        Track track = trackRepository.findTrackByNameAndGi(trackName, gi).get();
        User user = userService.getUser(userDto.getUsername()).get();
        userService.changeTrack(user, track);

        return ResponseEntity.ok("트랙이 업데이트 되었습니다.");
    }

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when email, pw is correct otherwise
     *         ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED)
     */

    @PostMapping("/login")
    @ApiOperation(value = "사용자가 싸피사람인지 인증한다.")
    public ResponseEntity<Boolean> checkUser(@RequestBody Map<String, String> map) {
        String email = map.get("email");
        String pw = map.get("pw");
        String eduPw = map.get("eduPw");

        User userDomain = new User(email, pw, eduPw);

        if (userService.getUser(email) == null) {
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        } else {
            userService.checkAccount(userDomain);
        }

        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
    }
    
}
