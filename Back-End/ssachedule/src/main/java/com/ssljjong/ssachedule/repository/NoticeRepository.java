package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.EduNotice;
import com.ssljjong.ssachedule.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select n from Notice n join fetch Channel c" +
            " join c.team t join t.teamUsers tu join tu.user u where u.id = :userId")
    List<Notice> findNoticesByUser(@Param("userId") Long userId);

    @Override
    Page<Notice> findAll(Pageable pageable);
}
