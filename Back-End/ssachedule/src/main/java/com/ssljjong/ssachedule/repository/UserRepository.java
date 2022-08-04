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
    List<User> findUserDomainListByTrack(@Param("trackId") Long trackId);

    /**
     * * find Users by Team
     *
     * @param Team Object
     * @return UserId List
     */

    @Query("select new com.ssljjong.ssachedule.dto.UserListDto(u.id) from User u join fetch TeamUser tu " +
            "join fetch Team t where t.id = :teamId")
    List<UserListDto> findUserIdListByTeam(@Param("teamId") Long teamId);

    @Query("select new com.ssljjong.ssachedule.dto.UserListDto(u.id) from User u join fetch TeamUser tu " +
            "join fetch Team t join fetch Channel c where c.id = :channelId")
    List<UserListDto> findUserIdListByChannel(@Param("channelId") Long channelId);

    @EntityGraph(attributePaths = "authorities") // Eager로 받아오게 해줌
    Optional<User> findUserByUsername(String username);


}
