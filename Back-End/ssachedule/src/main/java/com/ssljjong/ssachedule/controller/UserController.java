package com.ssljjong.ssachedule.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.service.UserService;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserDto userDto;

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

        userDto.setUser_email(email);
        userDto.setMm_email(email);
        userDto.setMm_pw(pw);
        if (userService.getUser(userDto)) {
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }

        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
    }
}
