package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

    /**
     * * find ChannelDtoList by UserId
     *
     * @param UserId
     * @return ChannelDtoList (
     */

    @Query("select new com.ssljjong.ssachedule.dto.ChannelDto(c.id, c.name)" +
            " from Channel c join fetch Team t join fetch TeamUser tu join fetch UserDomain u" +
            " where u.id = :userId")
    List<ChannelDto> findChannelsByUser(@Param("userId") Long id);

    /**
     * * find ChannelDtoList by UserId
     *
     * @param UserId
     * @return ChannelDtoList
     */
    @Query("select new com.ssljjong.ssachedule.dto.ChannelDto(c.id, c.name)" +
            " from Channel c join fetch Team t join fetch TeamUser tu join fetch UserDomain u" +
            " where u.id = :userId and c.critical = true")
    List<ChannelDto> findCriticalChannelsByUser(@Param("userId") Long id);


    Channel findChannelByName(String name);
}
