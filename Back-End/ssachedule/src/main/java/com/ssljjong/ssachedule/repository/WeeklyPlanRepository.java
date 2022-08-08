package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.WeeklyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WeeklyPlanRepository extends JpaRepository<WeeklyPlan, Long> {

    List<WeeklyPlan> findWeeklyPlansByDateBetween(String startDate, String endDate);

    List<WeeklyPlan> findWeeklyPlansByDate(String Date);
}
