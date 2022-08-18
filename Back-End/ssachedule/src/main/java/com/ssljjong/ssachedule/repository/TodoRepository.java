package com.ssljjong.ssachedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssljjong.ssachedule.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

        /**
         * * find Todos by Channel
         *
         * @param Channel Object
         * @return TodoListDto
         */
        @Query("select t from Todo t join fetch t.notice n join Channel c where c.id = :channelId")
        List<Todo> findTodosByChannel(@Param("channelId") String channelId);

        /**
         * * find Todos by Team
         *
         * @param Team Object
         * @return TodoListDto
         */

        @Query("select to from Todo to join fetch to.notice n join Channel c join c.team t " +
                        "where t.id = :teamId")
        List<Todo> findTodosByTeam(@Param("teamId") String teamId);

        /**
         * * find Todos by User
         *
         * @param User Object
         * @return TodoListDto
         */

        @Query("select to from Todo to join to.notice n join Channel c join c.team t join TeamUser tu join tu.user u" +
                        " where u.id = :userId")
        List<Todo> findTodosByUser(@Param("userId") Long userId);

        /**
         * * Find Todos with due date after today based on User
         *
         * @param user UserDomain
         * @param date LocalDate
         * @return TodoDto List
         */
        @Query("select t from Todo t join t.notice n join Channel c join c.team te join TeamUser tu join tu.user u" +
                        " where u.id = :userId and t.dueDate < :dueDate")
        List<Todo> findTodosByUserAndDueDate(@Param("userId") Long userId, @Param("dueDate") String dueDate);

        @Query("select t from Todo t where t.dueDate >= :today")
        List<Todo> findTodosByDueDate(@Param("today") String today);
}
