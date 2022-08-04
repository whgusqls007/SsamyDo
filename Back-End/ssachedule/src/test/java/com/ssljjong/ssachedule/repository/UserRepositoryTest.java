package com.ssljjong.ssachedule.repository;

// import com.ssljjong.ssachedule.dto.UserListDto;
// import com.ssljjong.ssachedule.entity.Team;
// import com.ssljjong.ssachedule.entity.TeamUser;
// import com.ssljjong.ssachedule.entity.Track;
// import com.ssljjong.ssachedule.entity.UserDomain;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.transaction.annotation.Transactional;

// import javax.persistence.EntityManager;
// import java.util.List;

// import static org.assertj.core.api.Assertions.*;
// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// @Transactional
// // @Rollback(value = false)
// class UserRepositoryTest {

// @Autowired
// UserRepository userRepository;
// @Autowired
// TrackRepository trackRepository;
// @Autowired
// EntityManager em;

// @Test
// public void testUser() {
// UserDomain user = new UserDomain("test@gmail.com", "test", "test@gmail.com",
// "test");
// userRepository.save(user);

// UserDomain findUser = userRepository.findById(user.getId()).get();

// assertThat(findUser.getId()).isEqualTo(user.getId());
// assertThat(findUser.getUserEmail()).isEqualTo(user.getUserEmail());

// // 같은 트랜잭션 안에서는 영속성 콘텍스트의 동일성을 보장한다 (1차캐싱)
// assertThat(findUser).isEqualTo(user);

// }

// @Test
// public void testFindUserIdListByTrack() {
// Track pythonTrack = new Track("Python", 7);
// Track javaTrack = new Track("Java", 7);
// trackRepository.save(pythonTrack);
// trackRepository.save(javaTrack);

// UserDomain user1 = new UserDomain(0751111, "test1@gmail.com", "test1",
// pythonTrack, "test1@gmail.com", "test1");
// UserDomain user2 = new UserDomain(0751112, "test2@gmail.com", "test2",
// javaTrack, "test2@gmail.com", "test2");
// UserDomain user3 = new UserDomain(0751113, "test3@gmail.com", "test3",
// pythonTrack, "test3@gmail.com", "test3");
// userRepository.save(user1);
// userRepository.save(user2);
// userRepository.save(user3);

// List<UserListDto> result = userRepository.findUserIdListByTrack(pythonTrack);
// assertThat(result.size()).isEqualTo(2);
// System.out.println(result);

// }

// @Test
// public void testFindUserIdListByTeam() {
// UserDomain user1 = new UserDomain("test1@gmail.com", "test1",
// "test1@gmail.com", "test1");
// UserDomain user2 = new UserDomain("test2@gmail.com", "test2",
// "test2@gmail.com", "test2");

// Team team = new Team("id1", "부울경2반");

// TeamUser teamUser = new TeamUser(team, user1);
// TeamUser teamUser2 = new TeamUser(team, user2);

// }
// }
// package com.ssljjong.ssachedule.repository;
//
// import com.ssljjong.ssachedule.dto.UserListDto;
// import com.ssljjong.ssachedule.entity.Team;
// import com.ssljjong.ssachedule.entity.TeamUser;
// import com.ssljjong.ssachedule.entity.Track;
// import com.ssljjong.ssachedule.entity.UserDomain;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.transaction.annotation.Transactional;
//
// import javax.persistence.EntityManager;
// import java.util.List;
//
// import static org.assertj.core.api.Assertions.*;
// import static org.junit.jupiter.api.Assertions.*;
//
// @SpringBootTest
// @Transactional
//// @Rollback(value = false)
// class UserRepositoryTest {
//
// @Autowired UserRepository userRepository;
// @Autowired TrackRepository trackRepository;
// @Autowired EntityManager em;
//
//
// @Test
// public void testUser() {
// UserDomain user = new UserDomain("test@gmail.com", "test", "test");
// userRepository.save(user);
//
// UserDomain findUser = userRepository.findById(user.getId()).get();
//
// assertThat(findUser.getId()).isEqualTo(user.getId());
// assertThat(findUser.getUserEmail()).isEqualTo(user.getUserEmail());
//
//
// // 같은 트랜잭션 안에서는 영속성 콘텍스트의 동일성을 보장한다 (1차캐싱)
// assertThat(findUser).isEqualTo(user);
//
// }
// @Test
// public void testFindUserIdListByTrack() {
// Track pythonTrack = new Track("Python", 7);
// Track javaTrack = new Track("Java", 7);
// trackRepository.save(pythonTrack);
// trackRepository.save(javaTrack);
//
// UserDomain user1 = new UserDomain(0751111, "test1@gmail.com", "test1",
// pythonTrack, "test1@gmail.com", "test1");
// UserDomain user2 = new UserDomain(0751112, "test2@gmail.com", "test2",
// javaTrack, "test2@gmail.com", "test2");
// UserDomain user3 = new UserDomain(0751113, "test3@gmail.com", "test3",
// pythonTrack, "test3@gmail.com", "test3");
// userRepository.save(user1);
// userRepository.save(user2);
// userRepository.save(user3);
//
//
// List<UserListDto> result = userRepository.findUserIdListByTrack(pythonTrack);
// assertThat(result.size()).isEqualTo(2);
// System.out.println(result);
//
// }
//
// @Test
// public void testFindUserIdListByTeam() {
// UserDomain user1 = new UserDomain("test1@gmail.com", "test1@gmail.com",
// "test1");
// UserDomain user2 = new UserDomain("test2@gmail.com", "test2@gmail.com",
// "test2");
//
// Team team = new Team("id1", "부울경2반");
//
// TeamUser teamUser = new TeamUser(team, user1);
// TeamUser teamUser2 = new TeamUser(team, user2);
//
//
//
//
//
//
//
// }
// }
