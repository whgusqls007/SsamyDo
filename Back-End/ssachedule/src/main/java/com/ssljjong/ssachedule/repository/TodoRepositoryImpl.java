package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.domain.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TodoRepositoryImpl implements TodoRepository {

    private final EntityManager em;

    @Override
    public void save(Todo todo) {
        em.persist(todo);
    }

    @Override
    public Todo findOne(Long id) {
        return em.find(Todo.class, id);
    }

    @Override
    public List<Todo> findAll() {
        return em.createQuery("select t from Todo t", Todo.class).getResultList();
    }

    /*
     * * get TodoList by date
     *
     * @param Date duedate
     * @return List<Todo>
     */
    @Override
    public List<Todo> findByDue(Date dueDate) {
        return em.createQuery("select t from Todo t where t.duedate <= :dueDate").getResultList();
    }

}
