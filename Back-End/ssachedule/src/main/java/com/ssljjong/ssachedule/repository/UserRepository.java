package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserDomain, Long> {

}
