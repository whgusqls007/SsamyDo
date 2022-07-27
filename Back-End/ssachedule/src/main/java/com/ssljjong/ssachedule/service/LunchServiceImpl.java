package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.entity.Lunch;
import com.ssljjong.ssachedule.repository.LunchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LunchServiceImpl implements LunchService{

    private final LunchRepository lunchRepository;

    /**
     * * Find lunch menu data for a certain period of time
     *
     * @return return List<Lunch> for today
     *
     */

    @Override
    public List<Lunch> getTodayLunch() {
        LocalDate now = LocalDate.now();
        Date today = java.sql.Date.valueOf(now);
        return lunchRepository.findByDate(today);
    }

    /**
     * * Find lunch menu data for a certain period of time
     *
     * @param date date to find
     * @return List<Lunch> for date given by param
     *
     */

    @Override
    public List<Lunch> getLunchForDate(Date date) {
        return lunchRepository.findByDate(date);
    }



    /**
     * * Find lunch menu data for a certain period of time
     *
     * @param start start date to find
     * @param end   end date to find
     * @return return List<Lunch> in Period start ~ end
     *
     */

    @Override
    public List<Lunch> getLunchesForPeriod(Date start, Date end) {
        return lunchRepository.findByPeriod(start, end);
    }


}
