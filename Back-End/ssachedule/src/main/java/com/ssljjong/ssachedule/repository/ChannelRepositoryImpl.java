package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Channel;
import com.ssljjong.ssachedule.domain.Team;
import com.ssljjong.ssachedule.domain.UserDomain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChannelRepositoryImpl implements ChannelRepository{

    private final EntityManager em;
    private final TeamRepository teamRepository;

    @Override
    public void save(Channel channel) {
        em.persist(channel);
    }

    @Override
    public Channel findOne(Long id) {
        return em.find(Channel.class, id);
    }

    @Override
    public List<Channel> findAll() {
        return em.createQuery("select c from Channel c").getResultList();
    }

    @Override
    public List<Channel> findByUser(UserDomain user) {
        return em.createQuery("select c from Channel c " +
                "inner join Team t " +
                "inner join TeamUser tu " +
                "where tu.user = :user").getResultList();
    }

    @Override
    public List<Channel> findByTeam(Team team) {
        return em.createQuery("select c from Channel c where c.team = :team").getResultList();
    }

    @Override
    public List<Channel> findCriticalTeam() {
        return em.createQuery("select c from Channel c where c.critical = True").getResultList();
    }

}
