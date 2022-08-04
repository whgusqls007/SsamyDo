package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import com.ssljjong.ssachedule.service.LunchService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

import javax.ws.rs.core.Response;

@RestController
@RequestMapping("/api/v1/lunch")
@RequiredArgsConstructor
public class LunchController {

    private final LunchService lunchService;

    @GetMapping("/today")
    @ApiOperation(value = "오늘 점심 메뉴 조회")
    public ResponseEntity<List<LunchDto>> getLunchForToday() {
        List<LunchDto> menus = lunchService.getTodayLunch();
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    @ApiOperation(value = "특정 날짜 점심 메뉴 조회")
    public ResponseEntity<List<LunchDto>> getLunchForDate(@PathVariable String date) {
        LocalDate day = LocalDate.parse(date);
        return new ResponseEntity<>(lunchService.getLunchForDate(day), HttpStatus.OK);
    }

    @GetMapping("/period/{startDate}/{endDate}")
    @ApiOperation(value = "특정 기간 점심 메뉴 조회")
    public ResponseEntity<List<LunchDto>> getLunchForPeriod(@PathVariable String startDate,
            @PathVariable String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return new ResponseEntity<>(lunchService.getLunchesForPeriod(start, end),
                HttpStatus.OK);
    }
}
