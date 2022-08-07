package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface LunchRepository extends JpaRepository<Lunch, Long> {


    List<Lunch> findByDate(String date);
    List<Lunch> findByDateBetween(String start, String end);



}
