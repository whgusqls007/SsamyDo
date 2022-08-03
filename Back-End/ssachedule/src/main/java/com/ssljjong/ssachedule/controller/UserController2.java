package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.entity.UserDomain;
import com.ssljjong.ssachedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController2 {

    private final UserRepository userRepository;

    public Boolean checkUser(String userEmail) {
        Optional<UserDomain> user = userRepository.findUserByUserEmail(userEmail);
        try {
            user.get();
            return Boolean.TRUE;
        } catch (Exception e){
            return Boolean.FALSE;
        }
    }
}
