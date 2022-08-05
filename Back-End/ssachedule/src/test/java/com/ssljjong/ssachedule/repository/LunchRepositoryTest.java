//package com.ssljjong.ssachedule.repository;
//
//import com.ssljjong.ssachedule.dto.LunchDto;
//import com.ssljjong.ssachedule.entity.Lunch;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import javax.transaction.Transactional;
//
//import java.time.LocalDate;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class LunchRepositoryTest {
//
//    @Autowired LunchRepository lunchRepository;
//
//    @Test
//    public void findLunchByDate() {
//        Lunch lunch1 = new Lunch("한식", "하아아안식", "1293981629klshnlkfhas.jpg", "test1", LocalDate.parse("2022-07-29"));
//        Lunch lunch2 = new Lunch("중식", "주우우웅식", "1293981629kls214124as.jpg", "test2", LocalDate.parse("2022-07-29"));
//        Lunch lunch3 = new Lunch("양식", "야아아앙식", "1293981123123klshnhas.jpg", "test3", LocalDate.parse("2022-07-30"));
//        lunchRepository.save(lunch1);
//        lunchRepository.save(lunch2);
//        lunchRepository.save(lunch3);
//
//        LocalDate date = LocalDate.parse("2022-07-29");
//        List<LunchDto> lunches = lunchRepository.findByDate(date);
//
//
//
//
//    }
//
//
//}