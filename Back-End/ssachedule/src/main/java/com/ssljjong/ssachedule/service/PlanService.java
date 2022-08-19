package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.dto.WeeklyPlanDto;

public interface PlanService {

    List<WeeklyPlanDto> findWeeklyPlanByDate(String date);

    List<WeeklyPlanDto> findWeeklyPlanByStartDate(String startDate);

    List<WeeklyPlanDto> findWeeklyPlanByDateBetween(String startDate, String endDate);

}
