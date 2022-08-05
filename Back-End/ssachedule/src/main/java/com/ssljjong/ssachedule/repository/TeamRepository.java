package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.TeamDto;
import com.ssljjong.ssachedule.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, String> {

    /**
     * * find Teams by userEmail
     *
     * @param userEmail mattermost email
     * @return List of Teams given user belongs to
     */

    @Query("select new com.ssljjong.ssachedule.dto.TeamDto(t.id, t.name) from User u join fetch TeamUser tu" +
            " join fetch Team t where u.id = :userId")
    List<TeamDto> findTeamsByUser(@Param("userId") Long userId);




}
