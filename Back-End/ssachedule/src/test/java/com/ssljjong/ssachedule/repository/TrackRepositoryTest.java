//package com.ssljjong.ssachedule.repository;
//
//import com.ssljjong.ssachedule.entity.Track;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class TrackRepositoryTest {
//
//    @Autowired TrackRepository trackRepository;
//
//    @Test
//    public void testFindTrackId() {
//
//        Track pythonTrack = new Track("Python", 7);
//        Track javaTrack = new Track("Java", 7);
//        trackRepository.save(pythonTrack);
//        trackRepository.save(javaTrack);
//
//        Track findTrack = trackRepository.findTrackByNameAndGi("Python", 7);
//
//        assertThat(findTrack.getId()).isEqualTo(pythonTrack.getId());
//
//    }
//}