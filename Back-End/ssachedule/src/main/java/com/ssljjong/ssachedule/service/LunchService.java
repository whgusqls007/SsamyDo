package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.LunchDto;

import java.time.LocalDate;
import java.util.List;

public interface LunchService {

    public List<LunchDto> getTodayLunch();
    public List<LunchDto> getLunchForDate(LocalDate date);
    public List<LunchDto> getLunchesForPeriod(LocalDate start, LocalDate end);

}
