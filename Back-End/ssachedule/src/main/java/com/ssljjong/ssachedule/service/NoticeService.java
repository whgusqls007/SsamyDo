package com.ssljjong.ssachedule.service;

import java.util.List;

import com.ssljjong.ssachedule.dto.NoticeDto;

public interface NoticeService {

    List<NoticeDto> findNoticesByPage(Integer page);

    List<NoticeDto> findNoticesByOffsetAndSize(Integer offset, Integer size);

}
