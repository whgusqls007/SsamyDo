package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.domain.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import com.ssljjong.ssachedule.service.LunchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LunchController {

    private final LunchService lunchService;
    private final LunchRepository lunchRepository;

    @GetMapping("/lunch/today")
    public void lunchToday() {
        List<Lunch> menus = lunchService.getTodayLunch();
        for (Lunch menu: menus) {
            System.out.println(menu.getId());
            System.out.println(menu.getMain());
            System.out.println(menu.getDetail());
            System.out.println(menu.getImg());
            System.out.println(menu.getDate());
        }
    }
}
