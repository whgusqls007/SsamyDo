package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrackRepository extends JpaRepository<Track, Long> {

    /**
     * * find Track By Track_Name and Gi
     *
     * @param trackName
     * @param gi
     * @return Track Object
     */
    Optional<Track> findTrackByNameAndGi(String name, int gi);

}
