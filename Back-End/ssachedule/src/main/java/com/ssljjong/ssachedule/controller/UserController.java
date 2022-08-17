package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.UserDto;
<<<<<<< HEAD
import com.ssljjong.ssachedule.dto.UserListDto;

import java.util.HashMap;
import java.util.List;
=======
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.jwt.TokenProvider;
import com.ssljjong.ssachedule.repository.TrackRepository;
<<<<<<< HEAD
=======

>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
>>>>>>> 091073318aefed9bb25869aec37bc98fc8cd5b55
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

<<<<<<< HEAD


=======
        System.out.println(Authorization);
        System.out.println(trackName);
        System.out.println(gi);
<<<<<<< HEAD
=======
>>>>>>> 6dbc107fd3044685d8dc2df9ab605f2305f8e33b
//        Authentication auth = tokenProvider.getAuthentication(Token);
//        System.out.println(auth.getDetails().toString());
//        Track track = trackRepository.findTrackByNameAndGi(trackName, gi).get();
//        User user = userService.getUserById(userId).get();
//        userService.changeTrack(user, track);
>>>>>>> 60fe18fa618de39894fedb2e005ff28b2a93eca3

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
        System.out.println();
=======
        System.out.println("servlet");
>>>>>>> 6dbc107fd3044685d8dc2df9ab605f2305f8e33b
>>>>>>> 60fe18fa618de39894fedb2e005ff28b2a93eca3
        Map<String, Object> info = new HashMap<>();
        List<UserListDto> allUsers = userService.getAllUsers();

        info.put("data", allUsers);

        return new ResponseEntity<>(info, HttpStatus.OK);
    }
}
