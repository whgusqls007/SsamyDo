package com.ssljjong.ssachedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssljjong.ssachedule.entity.Lunch;

public interface LunchRepository extends JpaRepository<Lunch, Integer> {

    List<Lunch> findByDate(String date);

    List<Lunch> findByDateBetween(String start, String end);

}
