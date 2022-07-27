package com.ssljjong.ssachedule.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.entity.UserDomain;
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
    @PostMapping("/checkuser")
    public ResponseEntity<Boolean> checkUser(@RequestBody Map<String, String> map) {
        UserDomain userDomain = new UserDomain();
        String email = map.get("email");
        String pw = map.get("pw");

        userDomain.setUserEmail(email);
        userDomain.setUserPw(pw);

        if (userService.checkUser(userDomain)) {
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }

        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
    }

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when update result is true
     *         otherwise ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST)
     */
    @PostMapping("/setusereduinfo")
    public ResponseEntity<Boolean> setUserEduInfo(@RequestBody Map<String, String> map) {
        String userEmail = map.get("userEmail");
        String eduEmail = map.get("eduEmail");
        String eduPw = map.get("eduPw");

        UserDomain userDomain = new UserDomain();
        userDomain.setUserEmail(userEmail);
        userDomain.setEduEmail(eduEmail);
        userDomain.setEduPw(eduPw);

        Boolean result = userService.setUserEduInfo(userDomain);

        if (!result) {
            return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
