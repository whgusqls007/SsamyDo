package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.UserDto;
import com.ssljjong.ssachedule.service.UserService;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
//
//    private final UserService userService;

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when email, pw is correct otherwise
     *         ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED)
     */

//    @PostMapping("/user/login")
//    public ResponseEntity<Boolean> checkUser(@RequestBody Map<String, String> map) {
//        String username = map.get("username");
//        String pw = map.get("pw");
//        String eduPw = map.get("eduPw");
//
//        User user = new User(username, pw, eduPw);
//
//        if (userService.getUser(username) == null) {
//            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
//        } else {
//            userService.checkAccount(user);
//        }
//
//        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
//    }
//    @PostMapping("/checkuser")
//    public ResponseEntity<Boolean> checkUser(@RequestBody Map<String, String> map) {
//        UserDomain userDomain = new UserDomain();
//        String email = map.get("email");
//        String pw = map.get("pw");
//
//        userDomain.setUserEmail(email);
//        userDomain.setUserPw(pw);
//
//        if (userService.checkUser(userDomain)) {
//            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
//        }
//
//        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
//    }

    /**
     * 
     * @param map json
     * @return ResponseEntity<Boolean>(true, HttpStatus.OK)
     *         when update result is true
     *         otherwise ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST)
     */
//    @PostMapping("/setusereduinfo")
//    public ResponseEntity<Boolean> setUserEduInfo(@RequestBody Map<String, String> map) {
//        String userEmail = map.get("userEmail");
//        String eduEmail = map.get("eduEmail");
//        String eduPw = map.get("eduPw");
//
//        UserDomain userDomain = new UserDomain();
//        userDomain.setUserEmail(userEmail);
//        userDomain.setEduEmail(eduEmail);
//        userDomain.setEduPw(eduPw);
//
//        Boolean result = userService.setUserEduInfo(userDomain);
//
//        if (!result) {
//            return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
//        }
//
//        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
//    }
    private final UserService userService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto
    ) throws Exception {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
    }
}
