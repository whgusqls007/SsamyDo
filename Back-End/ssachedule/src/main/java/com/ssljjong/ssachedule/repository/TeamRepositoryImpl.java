package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Team;
import com.ssljjong.ssachedule.domain.UserDomain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepository{

    private final EntityManager em;

    @Override
    public void save(Team team) {
        em.persist(team);
    }

    @Override
    public Team findOne(Long id) {
        return em.find(Team.class, id);
    }

    @Override
    public List<Team> findAll() {
        return em.createQuery("select t from Team t", Team.class).getResultList();
    }

    @Override
    public List<Team> findByUser(UserDomain user) {
        return em.createQuery("select t from TeamUser tu join tu.team t join tu.user u where tu.user = :user")
                .getResultList();
    }

}
