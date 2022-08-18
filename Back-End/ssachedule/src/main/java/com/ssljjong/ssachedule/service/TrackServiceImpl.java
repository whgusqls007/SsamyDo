package com.ssljjong.ssachedule.service;

import org.springframework.stereotype.Service;

import com.ssljjong.ssachedule.dto.TrackDto;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.repository.TrackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;

    @Override
    public TrackDto findTrack(String trackName, int gi) {
        Track track = trackRepository.findTrackByNameAndGi(trackName, gi).get();
        TrackDto trackDto = new TrackDto(track.getId(), track.getName(), track.getGi());
        return trackDto;
    }
}