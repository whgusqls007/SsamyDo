package com.ssljjong.ssachedule.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.dto.WeeklyPlanDto;
import com.ssljjong.ssachedule.repository.WeeklyPlanRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {

    private final WeeklyPlanRepository weeklyPlanRepository;

    @Override
    public List<WeeklyPlanDto> findWeeklyPlanByDate(String date) {
        List<WeeklyPlanDto> result = weeklyPlanRepository.findWeeklyPlansByDate(date).stream()
                .map(wp -> new WeeklyPlanDto(wp.getId(), wp.getTitle(), wp.getDate(), wp.getTime()))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<WeeklyPlanDto> findWeeklyPlanByStartDate(String startDate) {
        String endDate = String.valueOf(Long.valueOf(startDate) + 60000);

        List<WeeklyPlanDto> result = weeklyPlanRepository.findWeeklyPlansByDateBetween(startDate, endDate).stream()
                .map(wp -> new WeeklyPlanDto(wp.getId(), wp.getTitle(), wp.getDate(), wp.getTime()))
                .collect(Collectors.toList());
        System.out.println(result);
        return result;
    }

    @Override
    public List<WeeklyPlanDto> findWeeklyPlanByDateBetween(String startDate, String endDate) {
        List<WeeklyPlanDto> result = weeklyPlanRepository.findWeeklyPlansByDateBetween(startDate, endDate).stream()
                .map(wp -> new WeeklyPlanDto(wp.getId(), wp.getTitle(), wp.getDate(), wp.getTime()))
                .collect(Collectors.toList());
        return result;
    }
}
