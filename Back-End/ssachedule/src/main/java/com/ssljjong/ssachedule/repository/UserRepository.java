package com.ssljjong.ssachedule.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

        /**
         * * find UserList by Track
         *
         * @param Track Object
         * @return UserDto List only id
         */
        List<User> findUsersByTrack(Track track);

        /**
         * * find Users by Team
         *
         * @param Team Object
         * @return UserId List
         */

        @Query("select u from Team t join TeamUser tu join tu.user u" +
                        " where t.id = :teamId")
        List<User> findUsersByTeam(@Param("teamId") String teamId);

        @Query("select u from Channel c join c.team t join TeamUser tu join tu.user u" +
                        " where c.id = :channelId")
        List<User> findUsersByChannelId(@Param("channelId") String channelId);

        Optional<User> findUserByUsername(String username);

        @EntityGraph(attributePaths = "authorities") // Eager로 받아오게 해줌
        Optional<User> findOneWithAuthoritiesByUsername(String username);
}
