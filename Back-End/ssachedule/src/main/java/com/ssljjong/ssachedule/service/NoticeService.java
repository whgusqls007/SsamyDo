package com.ssljjong.ssachedule.service;

import com.ssljjong.ssachedule.dto.NoticeDto;
import com.ssljjong.ssachedule.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface NoticeService {

    List<NoticeDto> findNoticesByPage(Integer page);
    List<NoticeDto> findNoticesByOffsetAndSize(Integer offset, Integer size);

}
