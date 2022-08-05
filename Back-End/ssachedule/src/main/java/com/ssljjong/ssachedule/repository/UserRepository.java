package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.UserListDto;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * * find UserDtoList by Track
     *
     * @param Track Object
     * @return UserDto List only id
     */
    @Query("select new com.ssljjong.ssachedule.dto.UserListDto(u.id) from User u where u.track = :track")
    List<UserListDto> findUserIdListByTrack(@Param("track") Track track);

    /**
     * * find UsersEntityList by Track
     *
     * @param Track Object
     * @return UserDomainList
     */

    @Query("select new com.ssljjong.ssachedule.dto.UserListDto(u.id) from User u where u.track.id = :trackId")
    List<User> findUsersDomainListByTrack(@Param("trackId") Long trackId);

    /**
     * * find Users by Team
     *
     * @param Team Object
     * @return UserId List
     */

    @Query("select u from User u join TeamUser tu join fetch tu.team t" +
            " where t.id = :teamId")
    List<User> findUsersListByTeam(@Param("teamId") String teamId);

    @Query("select u from Channel c join fetch c.team t join fetch t.teamUsers tu join User u" +
            " where c.id = :channeId")
    List<User> findUsersListByChannel(@Param("channelId") String ChannelId);


    Optional<User> findUserByUsername(String username);
    @EntityGraph(attributePaths = "authorities") // Eager로 받아오게 해줌
    Optional<User> findOneWithAuthoritiesByUsername(String username);
}
