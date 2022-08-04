package com.ssljjong.ssachedule.controller;

import org.h2.util.Task;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {

  @GetMapping("/week")
  public ResponseEntity<Task> getWeekSchedule() {
    return null;
  }
}