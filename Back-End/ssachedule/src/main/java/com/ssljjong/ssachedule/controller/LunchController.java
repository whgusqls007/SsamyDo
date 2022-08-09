package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import com.ssljjong.ssachedule.service.LunchService;

import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/api/v1/lunch")
@RequiredArgsConstructor
public class LunchController {

    private final LunchService lunchService;

    @GetMapping("/lunch/today")
    @ApiOperation(value = "오늘 점심 메뉴 조회")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String, Object>> getLunchForToday() {
        List<LunchDto> menus = lunchService.getTodayLunch();

        Map<String, Object> result = new HashMap<>();
        result.put("data", menus);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/lunch/date/{date}")
    @ApiOperation(value = "특정 날짜 점심 메뉴 조회")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String, Object>> getLunchForDate(@PathVariable String date) {
        List<LunchDto> menus = lunchService.getLunchForDate(date);

        Map<String, Object> result = new HashMap<>();
        result.put("data", menus);

        return ResponseEntity.ok().body(result);

    }

    @GetMapping("/lunch/period/{startDate}/{endDate}")
    @ApiOperation(value = "특정 기간 점심 메뉴 조회")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String, Object>> getLunchForPeriod(@PathVariable String startDate, @PathVariable String endDate) {
        List<LunchDto> menus = lunchService.getLunchesForPeriod(startDate, endDate);

        Map<String, Object> result = new HashMap<>();
        result.put("data", menus);

        return ResponseEntity.ok().body(result);
    }
}
