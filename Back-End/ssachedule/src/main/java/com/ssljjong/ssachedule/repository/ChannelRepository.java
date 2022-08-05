package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, String> {

    /**
     * * find Channel List by UserId
     *
     * @param UserId
     * @return ChannelDtoList (
     */
    List<Channel> findChannelsByUser(@Param("userId") Long id);

    /**
     * * find Channel List by UserId
     *
     * @param UserId
     * @return ChannelDtoList
     */
    List<Channel> findCriticalChannelsByUser(@Param("userId") Long id);

    /**
     * * find Channel List by UserId
     *
     * @param UserId
     * @return ChannelDtoList
     */
    List<ChannelDto> findChannelsByTeam(@Param("teamId") String teamId);

    Channel findChannelByName(String name);
}
