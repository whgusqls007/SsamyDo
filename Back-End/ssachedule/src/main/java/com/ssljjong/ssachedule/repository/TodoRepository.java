package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Channel;
import com.ssljjong.ssachedule.entity.Team;
import com.ssljjong.ssachedule.entity.Todo;
import com.ssljjong.ssachedule.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>{

    /**
     * * find Todos by Channel
     *
     * @param Channel Object
     * @return TodoListDto
     */
    List<Todo> findTodosByChannel(Channel Channel);

    /**
     * * find Todos by Team
     *
     * @param Team Object
     * @return TodoListDto
     */

    List<Todo> findTodosByTeam(Team team);

    /**
     * * find Todos by User
     *
     * @param User Object
     * @return TodoListDto
     */

    List<Todo> findTodosByUser(User user);


    /**
     * * Find Todos with due date after today based on User
     *
     * @param user UserDomain
     * @param date LocalDate
     * @return TodoDto List
     */
    @Query("select t from Todo t join fetch t.channel c join fetch c.team te join TeamUser tu join tu.user u" +
            " where u.id = :userId and t.dueDate < :dueDate")
    List<Todo> findTodosByUserAndDueDate(@Param("userId") Long userId, @Param("dueDate") String dueDate);
}
