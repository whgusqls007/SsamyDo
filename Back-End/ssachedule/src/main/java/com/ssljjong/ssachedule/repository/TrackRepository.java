package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {

    /**
     * * find Track By Track_Name and Gi
     *
     * @param trackName
     * @param gi
     * @return Track Object
     */
    Track findTrackByNameAndGi(String name, int gi);





}
