package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Lunch;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

public interface LunchRepository {

    public void save(Lunch lunch);
    public List<Lunch> findByDate(Date date);

}
