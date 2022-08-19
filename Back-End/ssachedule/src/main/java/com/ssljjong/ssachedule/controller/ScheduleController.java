package com.ssljjong.ssachedule.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssljjong.ssachedule.entity.WeeklyPlan;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

  @GetMapping("/week")
  public ResponseEntity<WeeklyPlan> getWeekSchedule() {
    return null;
  }
}