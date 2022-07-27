package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.repository.LunchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
     */

    @Override
    public List<LunchDto> getTodayLunch() {
        LocalDate today = LocalDate.now();
        return lunchRepository.findByDate(today);
    }

    /**
     * * Find lunch menu data for a certain period of time
     *
     * @param date date to find
     * @return List<Lunch> for date given by param
     */

    @Override
    public List<LunchDto> getLunchForDate(LocalDate date) {
        return lunchRepository.findByDate(date);
    }

    /**
     * * Find lunch menu data for a certain period of time
     *
     * @param start start date to find
     * @param end   end date to find
     * @return return List<Lunch> in Period start ~ end
     */

    @Override
    public List<LunchDto> getLunchesForPeriod(LocalDate start, LocalDate end) {
        return lunchRepository.findByPeriod(start, end);
    }

}
