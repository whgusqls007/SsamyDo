package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService{

    private final TrackRepository trackRepository;

    @Override
    public Track findTrack(String trackName, int gi) {
        return trackRepository.findTrackByNameAndGi(trackName, gi);
    }
}
