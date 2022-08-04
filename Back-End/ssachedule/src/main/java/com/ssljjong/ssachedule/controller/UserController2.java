package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.entity.User;
import com.ssljjong.ssachedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController2 {

    private final UserRepository userRepository;

    public Boolean checkUser(String username) {
        Optional<User> user = userRepository.findUserByUsername(username);
        try {
            user.get();
            return Boolean.TRUE;
        } catch (Exception e){
            return Boolean.FALSE;
        }
    }
}
