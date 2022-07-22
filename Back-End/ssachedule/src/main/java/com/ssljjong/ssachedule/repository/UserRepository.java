package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.UserDto;
import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager entityManager;

    public void save(UserDto userDto) {
        entityManager.persist(userDto);
    }
}
