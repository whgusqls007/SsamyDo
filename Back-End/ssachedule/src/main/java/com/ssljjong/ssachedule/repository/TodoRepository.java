package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.dto.TodoListDto;
import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.Todo;
import com.ssljjong.ssachedule.entity.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>{

    /**
     * * find Todos by Channel
     *
     * @param Channel Object
     * @return TodoListDto
     */

    @Query("select new com.ssljjong.ssachedule.dto.TodoListDto(t.id, t.title, t.type, t.dueDate) from Todo t" +
            " join t.channel c where c.id = :channelId")
    List<TodoListDto> findTodoListByChannelId(@Param("channelId") String channelId);

    /**
     * * find Todos by Team
     *
     * @param Team Object
     * @return TodoListDto
     */

    @Query("select new com.ssljjong.ssachedule.dto.TodoListDto(t.id, t.title, t.type, t.dueDate) from Todo t join" +
            " t.channel c join c.team te where te.id = :teamId and c.critical = true")
    List<TodoListDto> findTodoListByTeam(@Param("teamId") String teamId);

    /**
     * * find Todos by User
     *
     * @param User Object
     * @return TodoListDto
     */

    @Query("select new com.ssljjong.ssachedule.dto.TodoListDto(t.id, t.title, t.type, t.dueDate) from Todo t join" +
            " t.channel c join c.team te join TeamUser tu join UserDomain u where u.id = :userId and " +
            "c.critical = true")
    List<TodoListDto> findTodoListByUserId(@Param("userId") Long id);


    /**
     * * Find Todos with due date after today based on User
     *
     * @param user UserDomain
     * @param date LocalDate
     * @return TodoDto List
     */
    @Query("select new com.ssljjong.ssachedule.dto.TodoListDto(t.id, t.title, t.type, t.dueDate) from Todo t join" +
            " t.channel c join c.team te join TeamUser tu join UserDomain u where u.id = :userId and t.dueDate >= :date")
    List<TodoListDto> findTodoListFromDateByUserId(@Param("userId") Long userId, @Param("date") LocalDate date);
}
