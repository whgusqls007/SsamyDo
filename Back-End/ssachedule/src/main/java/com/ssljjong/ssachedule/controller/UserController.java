package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.TrackRepository;
import com.ssljjong.ssachedule.service.TrackService;
import com.ssljjong.ssachedule.service.UserService;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final TrackService trackService;

    @GetMapping("/test")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("test");
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto
    ) throws Exception {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/track/change")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<String> changeTrack(@RequestBody UserDto userDto, @RequestBody String trackName,@RequestBody int gi){
        Track track = trackService.findTrack(trackName, gi);
        User user = userService.getUser(userDto.getUsername()).get();
        userService.changeTrack(user, track);

        return ResponseEntity.ok("트랙이 업데이트 되었습니다.");
    }
}
