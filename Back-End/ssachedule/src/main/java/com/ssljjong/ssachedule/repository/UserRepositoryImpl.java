package com.ssljjong.ssachedule.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.ssljjong.ssachedule.domain.UserDomain;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final EntityManager entityManager;

    /**
     * * Save UserDomain to database
     * 
     * @param userDomain
     */
    @Override
    public void save(UserDomain userDomain) {
        entityManager.persist(userDomain);
    }

    /**
     * * get userDomain by email
     * 
     * @param email userEmail
     * @return UserDomain
     */
    @Override
    public UserDomain findOne(String email) {
        return entityManager.find(UserDomain.class, email);
    }

    @Override
    public void updateOne(UserDomain userDomain) {
        entityManager.merge(userDomain);
    }
}
