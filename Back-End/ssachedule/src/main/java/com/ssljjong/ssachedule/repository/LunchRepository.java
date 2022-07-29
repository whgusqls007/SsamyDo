package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface LunchRepository extends JpaRepository<Lunch, Long> {

    @Query("select new com.ssljjong.ssachedule.dto.LunchDto(l.id, l.main, l.detail,l.img, l.store, l.date) from Lunch l")
    List<LunchDto> findByDate(LocalDate date);

    @Query("select new com.ssljjong.ssachedule.dto.LunchDto(l.id, l.main, l.detail,l.img, l.store, l.date) from Lunch l where l.date >= :start and l.date <= :end")
    List<LunchDto> findByPeriod(@Param("start") LocalDate start, @Param("end") LocalDate end);



}
