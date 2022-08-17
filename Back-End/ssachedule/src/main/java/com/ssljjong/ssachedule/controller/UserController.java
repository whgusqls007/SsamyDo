package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.UserDto;

import com.ssljjong.ssachedule.dto.UserListDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bis5.mattermost.client4.MattermostClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    MattermostClient client = MattermostClient.builder()
            .url("https://meeting.ssafy.com")
            // .logLevel(Level.INFO)
            .ignoreUnknownProperties()
            .build();
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
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<String> changeTrack(@RequestHeader String Authorization, @RequestBody String trackName,
            @RequestBody int gi) {

        System.out.println(Authorization);
        System.out.println(trackName);
        System.out.println(gi);

        return ResponseEntity.ok("트랙이 업데이트 되었습니다.");
    }

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when email, pw is correct otherwise
     *         ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED)
     */


    @GetMapping("/getUsers")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserInfo() {

        Map<String, Object> info = new HashMap<>();
        List<UserListDto> allUsers = userService.getAllUsers();

        info.put("data", allUsers);

        return new ResponseEntity<>(info, HttpStatus.OK);
    }
}
