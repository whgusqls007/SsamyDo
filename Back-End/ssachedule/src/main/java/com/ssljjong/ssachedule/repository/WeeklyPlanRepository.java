package com.ssljjong.ssachedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssljjong.ssachedule.entity.WeeklyPlan;

public interface WeeklyPlanRepository extends JpaRepository<WeeklyPlan, Long> {

    List<WeeklyPlan> findWeeklyPlansByDateBetween(String startDate, String endDate);

    List<WeeklyPlan> findWeeklyPlansByDate(String Date);
}
