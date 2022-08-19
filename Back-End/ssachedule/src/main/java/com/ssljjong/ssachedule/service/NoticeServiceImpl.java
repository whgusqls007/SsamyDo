package com.ssljjong.ssachedule.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.dto.NoticeDto;
import com.ssljjong.ssachedule.entity.Notice;
import com.ssljjong.ssachedule.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    @Override
    public List<NoticeDto> findNoticesByPage(Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "date"));
        List<Notice> notices = noticeRepository.findAll(pageRequest).getContent();
        List<NoticeDto> result = notices.stream()
                .map(n -> new NoticeDto(n.getId(), n.getTitle(), n.getDescription(), n.getDate(), n.getSource(), n.getFile_ids()))
                .collect(Collectors.toList());
        return result;
    }

    public List<NoticeDto> findNoticesByOffsetAndSize(Integer offset, Integer size) {
        PageRequest pageRequest = PageRequest.of(offset, size, Sort.by(Sort.Direction.DESC, "date"));
        List<Notice> notices = noticeRepository.findAll(pageRequest).getContent();
        List<NoticeDto> result = notices.stream()
                .map(n -> new NoticeDto(n.getId(), n.getTitle(), n.getDescription(), n.getDate(), n.getSource(), n.getFile_ids()))
                .collect(Collectors.toList());
        return result;
    }
}
