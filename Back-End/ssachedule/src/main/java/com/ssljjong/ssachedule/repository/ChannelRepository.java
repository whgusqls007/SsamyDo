package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.User;
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
    @Query("select c from Channel c join fetch c.team join TeamUser tu join User u" +
            " where u.id = :userId")
    List<Channel> findChannelsByUser(@Param("userId")Long userId);


    /**
     * * find Channel List by UserId
     *
     * @param UserId
     * @return ChannelDtoList
     */
    List<Channel> findChannelsByTeam(Team team);

    Channel findChannelByName(String name);
}
