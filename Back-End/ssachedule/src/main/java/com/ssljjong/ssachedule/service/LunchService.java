package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.domain.Lunch;

import java.util.Date;
import java.util.List;

public interface LunchService {

    public List<Lunch> getTodayLunch();
    public List<Lunch> getLunchForDate(Date date);
    public List<Lunch> getLunchesForPeriod(Date start, Date end);

}
