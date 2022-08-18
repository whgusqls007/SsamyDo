package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.WeeklyPlanDto;

import java.util.List;

public interface PlanService {

    List<WeeklyPlanDto> findWeeklyPlanByDate(String date);

    List<WeeklyPlanDto> findWeeklyPlanByStartDate(String startDate);

    List<WeeklyPlanDto> findWeeklyPlanByDateBetween(String startDate, String endDate);

}
