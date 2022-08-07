package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.TrackDto;

public interface TrackService {
    public TrackDto findTrack(String trackName, int gi);
}
