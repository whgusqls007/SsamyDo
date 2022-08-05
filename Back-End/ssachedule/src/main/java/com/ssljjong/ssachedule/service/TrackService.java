package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.entity.Track;

public interface TrackService {
    public Track findTrack(String trackName, int gi);
}
