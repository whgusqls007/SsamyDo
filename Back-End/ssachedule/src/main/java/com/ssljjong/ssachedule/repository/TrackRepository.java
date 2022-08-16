package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TrackRepository extends JpaRepository<Track, Integer> {

    /**
     * * find Track By Track_Name and Gi
     *
     * @param trackName
     * @param gi
     * @return Track Object
     */

    @Query("select t from Track t where t.name = :name and t.gi = :gi")
    Optional<Track> findTrackByNameAndGi(@Param("name") String name, @Param("gi") Integer gi);

}
