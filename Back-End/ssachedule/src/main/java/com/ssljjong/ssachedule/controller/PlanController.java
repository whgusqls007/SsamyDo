package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.WeeklyPlanDto;
import com.ssljjong.ssachedule.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plan")
public class PlanController {

    private final PlanService planService;


//    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/weekly/date/{date}")
    public ResponseEntity<Map<String, Object>> findPlansByDate(@PathVariable String date) {
        List<WeeklyPlanDto> plans = planService.findWeeklyPlanByDate(date);
        System.out.println(plans);
        Map<String, Object> response = new HashMap<>();
        response.put("data", plans);

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/weekly/period/{startDate}")
    public ResponseEntity<Map<String, Object>> findWeeklyPlans(@PathVariable String startDate) {
        List<WeeklyPlanDto> plans = planService.findWeeklyPlanByStartDate(startDate);

        Map<String, Object> response = new HashMap<>();
        response.put("data", plans);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/weekly/period/{startDate}/{endDate}")
    public ResponseEntity<Map<String, Object>> findPlansByPeriod(@PathVariable String startDate, @PathVariable String endDate) {
        List<WeeklyPlanDto> plans = planService.findWeeklyPlanByDateBetween(startDate, endDate);

        Map<String, Object> response = new HashMap<>();
        response.put("data", plans);

        return ResponseEntity.ok().body(response);
    }
}
