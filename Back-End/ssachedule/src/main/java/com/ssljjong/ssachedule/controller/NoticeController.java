package com.ssljjong.ssachedule.controller;

import com.ssljjong.ssachedule.dto.NoticeDto;
import com.ssljjong.ssachedule.dto.WeeklyPlanDto;
import com.ssljjong.ssachedule.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

//    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/page/{page}")
    public ResponseEntity<Map<String, Object>> getNoticesByPage(@PathVariable Integer page) {
        List<NoticeDto> notices = noticeService.findNoticesByPage(page);

        Map<String, Object> response = new HashMap<>();
        response.put("data", notices);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/offset/{offset}/{size}")
    public ResponseEntity<Map<String, Object>> getNoticesByPage(@PathVariable Integer offset, @PathVariable Integer size) {
        List<NoticeDto> notices = noticeService.findNoticesByOffsetAndSize(offset, size);

        Map<String, Object> response = new HashMap<>();
        response.put("data", notices);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
