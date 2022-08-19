package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.dto.LunchDto;

public interface LunchService {

    public List<LunchDto> getTodayLunch();

    public List<LunchDto> getLunchForDate(String date);

    public List<LunchDto> getLunchesForPeriod(String start, String end);

}
