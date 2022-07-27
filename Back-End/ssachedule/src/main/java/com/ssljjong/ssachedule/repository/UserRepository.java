package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.ChannelDto;
import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<UserDomain, Long> {

    /**
     * * find Teams by userEmail
     *
     * @param userEmail mattermost email
     * @return List of Teams given user belongs to
     */
    @Query("select new com.ssljjong.ssachedule.dto.TeamDto(t.id, t.name) from UserDomain u join fetch TeamUser tu join fetch Team t" +
            " where u.id = :userId")
    List<TeamDto> findTeamsByUserEmail(@Param("userId") Long id);


    @Query("select new com.ssljjong.ssachedule.dto.ChannelDto(c.id, c.name)" +
            " from Channel c join fetch Team t join fetch TeamUser tu join fetch UserDomain u" +
            " where u.id = :userId")
    List<ChannelDto> findChannelsByUser(@Param("userId") Long id);


    @Query("select new com.ssljjong.ssachedule.dto.ChannelDto(c.id, c.name)" +
            " from Channel c join fetch Team t join fetch TeamUser tu join fetch UserDomain u" +
            " where u.id = :userId and c.critical = true")
    List<ChannelDto> findCriticalChannelsByUser(@Param("userId") Long id);


}
