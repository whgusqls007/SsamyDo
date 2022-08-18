package com.ssljjong.ssachedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssljjong.ssachedule.entity.Team;

public interface TeamRepository extends JpaRepository<Team, String> {

    /**
     * * find Teams by userEmail
     *
     * @param userEmail mattermost email
     * @return List of Teams given user belongs to
     */

    @Query("select t from Team t join TeamUser tu join tu.user u" +
            " where u.id = :userId")
    List<Team> findTeamsByUser(@Param("userId") Long userId);




}
