package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.entity.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import com.ssljjong.ssachedule.service.LunchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LunchController {

    private final LunchService lunchService;
    private final LunchRepository lunchRepository;

    @GetMapping("/lunch/today")
    public List<LunchDto> lunchToday() {
        List<LunchDto> menus = lunchService.getTodayLunch();
        return menus;
    }
}
