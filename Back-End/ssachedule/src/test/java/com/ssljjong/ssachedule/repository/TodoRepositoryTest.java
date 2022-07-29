package com.ssljjong.ssachedule.repository;

import com.ssljjong.ssachedule.entity.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TodoRepositoryTest {

    @Autowired TodoRepository todoRepository;


}