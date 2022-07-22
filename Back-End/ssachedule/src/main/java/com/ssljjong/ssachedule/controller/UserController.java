package com.ssljjong.ssachedule.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when email, pw is correct otherwise
     *         ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED)
     */
    @PostMapping("/getuser")
    public ResponseEntity<Boolean> getUser(@RequestBody Map<String, Object> map) {
        UserDto userDto = new UserDto();
        String email = (String) map.get("email");
        String pw = (String) map.get("pw");

        userDto.setUserEmail(email);
        userDto.setUserPw(pw);
        userDto.setTrackId(1);
        if (userService.getUser(userDto)) {
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }

        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
    }
}
