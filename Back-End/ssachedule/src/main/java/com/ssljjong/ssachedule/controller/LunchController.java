package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import com.ssljjong.ssachedule.service.LunchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class LunchController {

    private final LunchService lunchService;

    @GetMapping("/lunch/today")
    @PreAuthorize("hasAnyRole('USER')")
    public List<LunchDto> getLunchForToday() {
        List<LunchDto> menus = lunchService.getTodayLunch();
        return menus;
    }

    @GetMapping("/lunch/date/{date}")
    @PreAuthorize("hasAnyRole('USER')")
    public List<LunchDto> getLunchForDate(@PathVariable String date) {
        LocalDate day = LocalDate.parse(date);
        return lunchService.getLunchForDate(day);
    }

    @GetMapping("/lunch/period/{startDate}/{endDate}")
    @PreAuthorize("hasAnyRole('USER')")
    public List<LunchDto> getLunchForPeriod(@PathVariable String startDate, @PathVariable String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return lunchService.getLunchesForPeriod(start, end);
    }
}
