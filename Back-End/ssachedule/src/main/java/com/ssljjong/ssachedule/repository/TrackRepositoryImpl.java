package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Track;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class TrackRepositoryImpl implements TrackRepository{

    private final EntityManager entityManager;

    @Override
    public void save(Track track) {
        entityManager.persist(track);
    }

    @Override
    public Track findOne(Long id) {
        return entityManager.find(Track.class, id);
    }

    @Override
    public List<Track> findAll() {
        return entityManager.createQuery("select t from Track t", Track.class).getResultList();
    }


    /*
     * * get TodoList by date
     *
     * @param int gisu, String TrackName
     * @return Track
     */

    @Override
    public Track findTrack(int gisu, String trackName) {
        return entityManager
                .createQuery("select t from Track t where t.gisu = :gisu and  t.name = :trackName", Track.class)
                .getSingleResult();
    }


}
