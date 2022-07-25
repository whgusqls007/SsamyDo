package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Track;

import java.util.List;

public interface TrackRepository {

    public void save(Track track);
    public Track findOne(Long id);
    public List<Track> findAll();
    public Track findTrack(int gisu, String trackName);
}
