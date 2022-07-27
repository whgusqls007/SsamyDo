package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Lunch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class LunchRepositoryImpl implements LunchRepository{

    private final EntityManager em;

    @Override
    public void save(Lunch lunch) {
        em.persist(lunch);
    }

    @Override
    public List<Lunch> findByDate(Date date) {
        return em.createQuery("select l from Lunch l where l.date = :date").setParameter("date", date).getResultList();
    }

    @Override
    public List<Lunch> findByPeriod(Date start, Date end) {
        return em.createQuery("select l from Lunch l where :start <= l.date and l.date<= :end")
                .setParameter("start", start)
                .setParameter("end", end)
                .getResultList();
    }


}
