-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: ssafy
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES ('ROLE_ADMIN'),('ROLE_USER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `channel_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`channel_id`),
  KEY `FK63ug4lh1q6hpxuyqhbs6xm1v8` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES ('9wwq64ea3tfgdb77qzeizpk6jh','싸피레이스 <공지>','sipru1w4fpyqpjtoy3591nsajc'),('eoccnjbrai8a8q4kkuqt5zqyiw','공지사항','cyhw4bdksjrt9qfsekr6kfd9th'),('FKeohkxcd075yr3lvmw0hadbenq','싸피레이스 <공지>','cyhw4bdksjrt9qfsekr6kfd9th'),('ifnk3x3fubd8imfomupqddk1sc','1. SSAFY NEWS (공지)','sipru1w4fpyqpjtoy3591nsajc'),('s3embj9shpnttn37jzpuqy1gra','test <공지>','cyhw4bdksjrt9qfsekr6kfd9th');
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (99);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lunch`
--

DROP TABLE IF EXISTS `lunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lunch` (
  `lunch_id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `main` varchar(255) DEFAULT NULL,
  `store` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lunch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lunch`
--

LOCK TABLES `lunch` WRITE;
/*!40000 ALTER TABLE `lunch` DISABLE KEYS */;
INSERT INTO `lunch` VALUES (2,'20220812','차돌깍두기볶음밥,유부장국,핫도그&케찹&머스타드,과일샐러드,참나물생채','http://samsungwelstory.com/data/manager/recipe/E32M/20220812/mo20190322152157.png','차돌깍두기볶음밥','한식사계'),(3,'20220812','라면(스낵면)&볶음김치,치킨너겟&머스타드,과일샐러드,흰쌀밥,슬림단무지,한라봉에이드','http://samsungwelstory.com/data/manager/recipe/E32M/20220812/mo20220527180923.png','라면(스낵면)&볶음김치','모던키친'),(4,'20220812','팝만두튀김*초간장,그린샐러드&드레싱2종,워터젤리,포기김치,갓김치','http://samsungwelstory.com/data/manager/recipe/E32M/20220812/mo20210824094037.png','그린샐러드&드레싱2종','스냅스낵'),(5,'20220814','닭도리탕,잡채,다시마숙회&초장,유채나물,흰쌀밥','http://samsungwelstory.com/data/manager/recipe/E32M/20220814/mo20220814105847.jpg','닭도리탕','모던키친'),(6,'20220814','계란떡볶이,김말이튀김&오징어다리튀김,후리가케양념밥,피크닉','http://samsungwelstory.com/data/manager/recipe/E32M/20220814/mo20220814105821.jpg','계란떡볶이','한식사계'),(7,'20220814','라면(생생우동),흰쌀밥,슬림단무지,약과,피크닉,오징어야채핫바&케찹','http://samsungwelstory.com/data/manager/recipe/E32M/20220814/mo20220814110055.jpg','라면(생생우동)','동방식객'),(8,'20220814','미각카스테라롤,밤도라야끼','http://samsungwelstory.com/data/manager/recipe/E32M/20220814/mo20220814110001.jpg','미각카스테라롤','스냅스낵'),(9,'20220815','참치짜글이,미트볼굴소스볶음,콩나물무침,흰쌀밥,계란후라이&김가루','http://samsungwelstory.com/data/manager/recipe/E32M/20220815/mo20220815105829.jpg','참치짜글이','동방식객'),(10,'20220815','중화풍덮밥,게살스프,크림레몬새우,단무지무침,석류푸딩','http://samsungwelstory.com/data/manager/recipe/E32M/20220815/mo20220815105844.jpg','중화풍덮밥','한식사계'),(11,'20220815','라면(불닭볶음면),타코야끼,옥수수버터구이,흰쌀밥,슬림단무지,스프라이트킨사이다','http://samsungwelstory.com/data/manager/recipe/E32M/20220815/mo20220815105857.jpg','라면(불닭볶음면)','모던키친'),(12,'20220815','허쉬초코롤,밀크요팡','http://samsungwelstory.com/data/manager/recipe/E32M/20220815/mo20220815105910.jpg','허쉬초코롤','스냅스낵'),(13,'20220816','뚝배기제육볶음,시락국,멸치볶음,허브생채,흰쌀밥','http://samsungwelstory.com/data/manager/recipe/E32M/20220816/mo20220816105732.jpg','뚝배기제육볶음','한식사계'),(14,'20220816','어니언바베큐라이스&가라아게,허브요거트무팀침,양배추피클,마운틴듀','http://samsungwelstory.com/data/manager/recipe/E32M/20220816/mo20220816105754.jpg','어니언바베큐라이스&가라아게','모던키친'),(15,'20220816','라면(삼양라면)&유부사리,흰쌀밥,슬림단무지,브라우니,황도,마운틴듀','http://samsungwelstory.com/data/manager/recipe/E32M/20220816/mo20220816105859.jpg','라면(삼양라면)&유부사리','동방식객'),(16,'20220816','고구마맛탕,포기김치,토마토,백김치','http://samsungwelstory.com/data/manager/recipe/E32M/20220816/mo20220816105921.jpg','토마토','스냅스낵'),(17,'20220817','로제찜닭,흰쌀밥,느타리버섯볶음,깐마늘지','http://samsungwelstory.com/data/manager/recipe/E32M/20220817/mo20220817105155.jpg','로제찜닭','한식사계'),(18,'20220817','부산밀면,김치메밀전병,과일샐러드,냉면무김치','http://samsungwelstory.com/data/manager/recipe/E32M/20220817/mo20220817105215.jpg','부산밀면','별미공방'),(19,'20220817','대구납작만두,양념어묵꼬치,흰쌀밥,슬림단무지,카프리썬,라면(참깨라면)','http://samsungwelstory.com/data/manager/recipe/E32M/20220817/mo20220817105232.jpg','라면(무파마)','동방식객'),(20,'20220817','한방돈사태찜,그린샐러드&드레싱2종,포기김치,깍두기','http://samsungwelstory.com/data/manager/recipe/E32M/20220817/mo20220817105251.jpg','그린샐러드&드레싱2종','스냅스낵'),(21,'20220818','우삼겹짬뽕,쌀밥,꿔바로우,양파&춘장','http://samsungwelstory.com/data/manager/recipe/E32M/20220818/mo20220818105343.jpg','우삼겹짬뽕','동방식객'),(22,'20220818','뼈다귀김치찌개,쌀밥,찰떡궁합조림,쥐어채볶음,고추쌈장무침','http://samsungwelstory.com/data/manager/recipe/E32M/20220818/mo20220818105400.jpg','뼈다귀김치찌개','모던키친'),(23,'20220818','함박오므라이스*볼케이노소스,우동국,하와이안샐러드,오복지무침','http://samsungwelstory.com/data/manager/recipe/E32M/20220818/mo20220818105425.jpg','함박오므라이스*볼케이노소스','한식사계'),(24,'20220818','부대찌개라면(소고기라면),후리가케주먹밥,쌀밥,단무지,스파클링','http://samsungwelstory.com/data/manager/recipe/E32M/20220818/mo20220818105455.jpg','부대찌개라면(소고기라면)','스냅스낵'),(25,'20220819','분팃느엉,쌀국수육수,채소볶음밥,춘권/사모사튀김,양파레몬절임','http://samsungwelstory.com/data/manager/recipe/E32M/20220819/mo20220819105202.jpg','분팃느엉','한식사계'),(26,'20220819','쇠고기미역국,쌀밥,오징어두루치기,알찬소시지전*케찹,참나물생채','http://samsungwelstory.com/data/manager/recipe/E32M/20220819/mo20220819105220.jpg','쇠고기미역국','모던키친'),(27,'20220819','치킨도리아,마늘빵,타코샐러드,삼색피클,환타','http://samsungwelstory.com/data/manager/recipe/E32M/20220819/mo20220819105242.jpg','치킨도리아','동방식객'),(28,'20220819','라면(열라면),슬라이스치즈,춘권/사모사튀김,크리스피롤,쌀밥,단무지,환타','http://samsungwelstory.com/data/manager/recipe/E32M/20220819/mo20220819105302.jpg','라면(열라면)','스냅스낵');
/*!40000 ALTER TABLE `lunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthlyplan`
--

DROP TABLE IF EXISTS `monthlyplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthlyplan` (
  `mp_id` bigint NOT NULL,
  `date` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `track_track_id` bigint DEFAULT NULL,
  PRIMARY KEY (`mp_id`),
  KEY `FKf9ftif3vlx9oix49fytb8yl49` (`track_track_id`),
  CONSTRAINT `FKf9ftif3vlx9oix49fytb8yl49` FOREIGN KEY (`track_track_id`) REFERENCES `track` (`track_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthlyplan`
--

LOCK TABLES `monthlyplan` WRITE;
/*!40000 ALTER TABLE `monthlyplan` DISABLE KEYS */;
/*!40000 ALTER TABLE `monthlyplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `source` varchar(31) NOT NULL DEFAULT 'M',
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(1023) DEFAULT NULL,
  `file_ids` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `channel_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FKeohkxcd075yr3lvmw0hadbenq` (`channel_id`),
  CONSTRAINT `FKeohkxcd075yr3lvmw0hadbenq` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES ('E',28823,'20220105',NULL,NULL,'[기타] 출결 소명 작성 가이드 안내',NULL),('E',40441,'20220609',NULL,NULL,'[학습] 7기 2학기 안내',NULL),('E',41699,'20220701',NULL,NULL,'[학습] 7기 2학기 진행 예정 일정',NULL),('E',44635,'20220713',NULL,NULL,'[학습] 공통 프로젝트 다시보기',NULL),('E',45354,'20220722',NULL,NULL,'[운영] 2학기 공통프로젝트 3주차 안내',NULL),('E',45631,'20220725',NULL,NULL,'[학습] 우수교육생 삼성전자-SSAFY SSDC 프로젝트 실시 안내',NULL),('E',46046,'20220727',NULL,NULL,'[운영] 7기 공통프로젝트 UCC 경진대회 안내',NULL),('E',46055,'20220727',NULL,NULL,'[운영] SSAFY 코로나19 개인 방역 수칙 준수 안내',NULL),('E',46240,'20220729',NULL,NULL,'[운영] 2학기 공통프로젝트 4주차 안내',NULL),('E',46343,'20220729',NULL,NULL,'[운영] 7월 교육지원금 서명 안내',NULL),('E',46696,'20220803',NULL,NULL,'[운영] 2학기 공통프로젝트 5주차 안내',NULL),('E',46843,'20220805',NULL,NULL,'[기타] OPIc 응시권 및 수강권 지원 안내',NULL),('E',47051,'20220810',NULL,NULL,'[운영] 2학기 공통프로젝트 6주차 안내',NULL),('E',47062,'20220810',NULL,NULL,'[운영] 7기 공통프로젝트 산출물 제출 안내',NULL),('E',47151,'20220812',NULL,NULL,'[학습] 삼성전자 SSDC 프로젝트 참가자 발표안내',NULL),('M',47212,'20220818','@here\n\n[특화PJT 팀빌딩 안내]\n에듀싸피에 팀빌딩 설문을 오픈하였습니다. (8/18 18시까지)\n현재 캠퍼스 단위로 개설된 MM채널 내, 도메인별 채널에서 자유롭게 팀구성 후 팀장님만 설문에 응시해주시면 됩니다.\n\n캠퍼스별 공유된 팀구성시트는 우리 모두 비대면으로 소통하는 약속 중에 하나입니다.\n변경되는 정보들은 바로바로 업데이트해주시고,\n변경없이 팀픽스 완료된 팀은 팀장님이 에듀싸피 설문을 통해 팀정보를 제출해주시기 바랍니다.\n에듀싸피 설문은 1회만 응시 가능하며, 수정이 불가하오니 반드시 모든 정보가 확정된 후 꼼꼼히 확인하시어 응시바랍니다 :slightly_smiling_face: \n\n :arrow_forward: 팀구성 설문응시기간은 금일부터 8/18 18시까지입니다. :breeze_flower: \n :arrow_forward: 팀원은 비전공2명, 전공2명이 포함돼 있어야합니다.\n :round_pushpin: 트랙별 전공/비전공 비율이 다소 차이가 있기때문에, 특정 전공에 인원이 몰리지 않도록 진행해주세요 :pray: \n :round_pushpin: 특정 전공이 몰린 팀의 경우, 상황에 따라 사무국 조정이 있을 수 있습니다.\n :round_pushpin: 관련 문의사항은 사무국 반 담당프로께 연락주세요.\n :arrow_forward: 팀원은 6인 1팀이 원칙입니다. (7인팀구성 불가)\n :arrow_forward: 취업으로 퇴소 예정에 있는 교육생은 사무국 및 팀원들에게 즉시 연락해주시기 바랍니다 (팀구성 하시면 안돼요 :eyes: )\n\n팀구성 관련 문의사항은 언제든 사무국 반 담당프로께 연락주세요.:man-gesturing-ok:','[]','[특화PJT 팀빌딩 안내]',NULL),('M',47215,'20220818','8 17 4   8 192 낮 12 시 까지 제출 필수  공통 프로젝트 활용 동의서  7기공통프로 젝트 산출물  에듀싸피 공지 확인  렀  실습코치님전달 사항  팀별 프로젝트 개요 최신 버전 업데이트 요청  발표 피드백 신청 접수 중  특화 프로젝트 팀 빌딩  기간  8월 18 일  목  18   구글 스프레드 시트 상단에 기재된 팀 구성 요건 필독  기타 7기 전체  채널  삼성 임직원 멘토링 이벤트 오프라인 데이에 금요일 발표에 필요한 노트복  장비 봉인 필수 등 개인 물품 잘챙겨가주 세요','6pg6kwu9s78umgnm33j5yt7w7w','8/17(4) Remind',NULL),('M',47217,'20220819','8월 20일(목) 18시\n공통 프로젝트 활용동의서','seo3mu5ysfr69rgokctco1jmko','공통 프로젝트 활용동의서 제출',NULL),('M',47218,'20220819','특화  팀빌딩 안내 에듀싸피에 팀빌딩 설문을 오픈하였습니다  8 18 18시까지 현재 캠퍼스 단위로 개설된  채널 내 도메인별 채널에서 자유롭게 팀구성 후 팀장님만 설문에 응시해주시면 됩니다  캠퍼스별 공유된 팀구성시트는 우리 모두 비대면으로 소통하는 약속 중에 하나입니다 변경되는 정보들은 바로바로 업데이트해주시고 변경없이 팀픽스 완료된 팀은 팀장님이 에듀싸피 설문을 통해 팀정보를 제출해주시기 바랍니다 에듀싸피 설문은 1회만 응시 가능하며 수정이 불가하오니 반드시 모든 정보가 확정된 후 꼼꼼히 확인하시어 응시바랍니다             팀구성 설문응시기간은 금일부터 8 18 18시까지입니다           팀원은 비전공2명 전공2명이 포함돼 있어야합니다       트랙별 전공 비전공 비율이 다소 차이가 있기때문에 특정 전공에 인원이 몰리지 않도록 진행해주세요        특정 전공이 몰린 팀의 경우 상황에 따라 사무국 조정이 있을 수 있습니다       관련 문의사항은 사무국 반 담당프로께 연락주세요       팀원은 6인 1팀이 원칙입니다  7인팀구성 불가       취업으로 퇴소 예정에 있는 교육생은 사무국 및 팀원들에게 즉시 연락해주시기 바랍니다 팀구성 하시면 안돼요     팀구성 관련 문의사항은 언제든 사무국 반 담당프로께 연락주세요','[]','[특화PJT 팀빌딩 안내]',NULL),('M',47219,'20220819','8월 19일(금) 17시\n공통 프로젝트의 끝','[]','컨설턴트님과의 마지막 종례',NULL),('M',47220,'20220819','8월 19일(금) 12시\n공통 프로젝트 과제물 제출','[]','공통프로젝트 산출물 제출',NULL),('M',47221,'20220819','8월 20일(토)\n잊지말고 리마인드 상황','ydyi9p3xuiyq8mpwhpgbo3dm4c','8/20 리마인드',NULL);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES ('cyhw4bdksjrt9qfsekr6kfd9th','7기 공통 부울경2반'),('sipru1w4fpyqpjtoy3591nsajc','7기 공지 전용');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_user`
--

DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_user` (
  `id` bigint NOT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiuwi96twuthgvhnarqj34mnjv` (`team_id`),
  KEY `FK6w6lkqjk13n0nmf4jbnb3d376` (`user_id`),
  CONSTRAINT `FK6w6lkqjk13n0nmf4jbnb3d376` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKiuwi96twuthgvhnarqj34mnjv` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_user`
--

LOCK TABLES `team_user` WRITE;
/*!40000 ALTER TABLE `team_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `todo_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(1023) DEFAULT NULL,
  `due_date` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `notice_id` int DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `file_ids` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `NoticeID` (`notice_id`),
  CONSTRAINT `NoticeID` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (47,'8월 20일(목) 18시\n공통 프로젝트 활용동의서','202208201800','공통 프로젝트 활용동의서 제출',0,47217,'20220819','seo3mu5ysfr69rgokctco1jmko'),(48,NULL,'202208191400','(220815)SSAFY 7기 사연함(공통6주차)',1,NULL,'202208150900',NULL),(49,NULL,'202208190900','220819(금)_오전 건강현황 조사_7기',1,NULL,'202208190830',NULL),(50,NULL,'202208180900','220818(목)_오전 건강현황 조사_7기',1,NULL,'202208180830',NULL),(51,NULL,'202208182000','[7기] 특화 프로젝트 팀구성 설문',1,NULL,'202208171100',NULL),(52,NULL,'202208170900','220817(수)_오전 건강현황 조사_7기',1,NULL,'202208170830',NULL),(53,NULL,'202208160900','220816(화)_오전 건강현황 조사_7기',1,NULL,'202208160830',NULL),(54,NULL,'202208161800','[7기] 타 SW교육과정 이수 여부 설문',1,NULL,'202208121730',NULL),(55,NULL,'202208161500','(220812) 7기 공통 프로젝트 5주차 만족도 설문',1,NULL,'202208121730',NULL),(56,NULL,'202208161500','(220812) 7기 공통 프로젝트 라이브 방송 5주차 만족도 설문',1,NULL,'202208121730',NULL),(57,NULL,'202208120900','220812(금)_오전 건강현황 조사_7기',1,NULL,'202208120830',NULL),(58,'8월 19일(금) 17시\n공통 프로젝트의 끝','202208191700','컨설턴트님과의 마지막 종례',0,47219,'20220819','[]'),(59,'8월 19일(금) 12시\n공통 프로젝트 과제물 제출','202208191200','공통프로젝트 산출물 제출',0,47220,'20220819','[]'),(60,'8월 20일(토)\n잊지말고 리마인드 상황','202208200000','8/20 리마인드',0,47221,'20220819','ydyi9p3xuiyq8mpwhpgbo3dm4c');
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `track` (
  `track_id` bigint NOT NULL,
  `gi` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`track_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track`
--

LOCK TABLES `track` WRITE;
/*!40000 ALTER TABLE `track` DISABLE KEYS */;
INSERT INTO `track` VALUES (1,7,'common'),(2,8,'Python'),(3,8,'java'),(4,7,'Python'),(5,7,'Javab'),(6,7,'Java'),(7,7,'Embedded'),(8,7,'Mobile');
/*!40000 ALTER TABLE `track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL,
  `edu_pw` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `track_track_id` bigint DEFAULT NULL,
  `fcmtoken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `USERNAME` (`username`),
  KEY `FK9tisuj4rsjk7lm1ni842l9f81` (`track_track_id`),
  CONSTRAINT `FK9tisuj4rsjk7lm1ni842l9f81` FOREIGN KEY (`track_track_id`) REFERENCES `track` (`track_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (79,'SREmmgtZ8izcUQiziZlvNZxdHx5H9JscRO1/BSZaJbVi82TxE4cAXqINqX5xw2uQ9xc4geUTX8k4h4HhsTJNcZy3YA+ozn9RaQBjTJ4DGMKW07y3WlSYqMyRTANoEy9aIopzq/4s4S65jZx6VeqkZexzt9oKqCjjujnWicMKbdMTGqBGSVCsv5xWvtbzCLLP','$2a$10$czPj953uBpQp5kcvO/RAhOChMte5uSZ5z.MHlAvkC6uWcRO3kfSjO','ms_google@naver.com',5,'ExponentPushToken[wwAclgMRgPUBkJwMzvgUVQ]'),(96,'G0ezFsbSpDi+jQivU17Uv0KPrctVQsVycn+gqVuRPNIhve1zQzHcgXIv5VnMEYayJUhA3NhO3FeVTPlFDRmtn+fCz2QqmqzysgiKc63sf+1iy3wm9JLsFVSRb45prolKrqQ1CW6HarJlHge81+jYqQJO7f7DdzpMCpcQIpKD3xH68JRmoXAoGcLlAxswhaQd','$2a$10$fxY7ZcAS7NhN.XfNoshrT.wHHvD9kpXT1YVcu/AUPv8hO0LHF4cHm','jo7hb@naver.com',6,'ExponentPushToken[1tUYhyMhteOENelXnjv2Qt]'),(97,'2sqCnJz7X7Q7EEaiJv3qVgsPSQAqFU4p7VJs2QON5XYkzBGm82Dzj45lEU2AM0c9+4wy8MeoZoo8myT/BkW96NFan8+YSLgMs8hDAdnqI/VcvQBRGVdCSS0qqcIeK+N6n0hoxpI+tiKKzBFOEtkLx8sYPaVnTJIOiERfroMa5IIXeM5aWddtL9GoeETfeKoo','$2a$10$YZnIr0UpBP0mkfESh6NneuK3Y6NltsmsgATo6j8O.2iRniRhU/K7O','33j073@gmail.com',4,''),(98,'JiZwWVVWWPvzR4d+nATUp5HLZ4jwTR/Ud2BjUUHUg1zlguFEbYAlRu559Uz/stLYHTGyuLT168VxFj6rUsLH8j1EPs3tbqqnk7uQDKEJhNCPPNqUCmLCZXSCGfvrJMi1UmNOwD/oqL1njDy/+fVJIaAWcfk1T9uSacR6T5kcG7qIJz/5naR+07lCaA4XS6L9','$2a$10$SXrEpVks13ljXiE/m6BkoOhNlwAghueZZGoXQg4DSCkfsSu8KytDe','soshot22@naver.com',4,'ExponentPushToken[HMkfw5JEmMCn28Uj-Tlj-M]'),(999999,'kev6+3rHAv5NHAs+swH+z2PZtJGoUNrZ5sW3uDfqTJhD6CWxMwE85JYZW1pDV1uaH0T8/uTufJXZVGY+hZ+UXIWZy1ZGHuPFiUNB33QuN08xWleu+qashG+HpvtUsuLa2pgm4juFAwTotCYlvCRh/w9jNCPz42NfB2yslJYdhHiv1mxOEOhgoqAeJHJOa046','$2a$10$XvkiV.94nVEycxDdPw3kHuY4ZTbfTWQAuDB95/6AVPFb1mp0b5ylC','admin',6,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authority`
--

DROP TABLE IF EXISTS `user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authority` (
  `user_id` bigint NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `FK6ktglpl5mjosa283rvken2py5` (`authority_name`),
  CONSTRAINT `FK6ktglpl5mjosa283rvken2py5` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`authority_name`),
  CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority`
--

LOCK TABLES `user_authority` WRITE;
/*!40000 ALTER TABLE `user_authority` DISABLE KEYS */;
INSERT INTO `user_authority` VALUES (999999,'ROLE_ADMIN'),(79,'ROLE_USER'),(96,'ROLE_USER'),(97,'ROLE_USER'),(98,'ROLE_USER'),(999999,'ROLE_USER');
/*!40000 ALTER TABLE `user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weeklyplan`
--

DROP TABLE IF EXISTS `weeklyplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weeklyplan` (
  `wp_id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`wp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weeklyplan`
--

LOCK TABLES `weeklyplan` WRITE;
/*!40000 ALTER TABLE `weeklyplan` DISABLE KEYS */;
INSERT INTO `weeklyplan` VALUES (1,'20220808','09:00~14:00','Sub-PJT Ⅲ 중간평가'),(2,'20220808','14:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(3,'20220809','09:00~10:00','[Live] SW테스트 케이스 설계'),(4,'20220809','10:00~14:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(5,'20220809','14:00~16:30','[Live] 특화 PJT 도메인 소개'),(6,'20220809','16:30~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(7,'20220810','09:00~10:00','[Live] Modern Java와 Python'),(8,'20220810','10:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(9,'20220811','09:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(10,'20220812','09:00~10:00','[Live] 공통 프로젝트 발표회 팁'),(11,'20220812','10:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(12,'20220816','09:00~10:00','[Live] OWASP Top 10, 시큐어 코딩 실습 #1. Java편'),(13,'20220816','10:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(14,'20220817','09:00~10:00','[Live] CPU 구조'),(15,'20220817','10:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(16,'20220818','09:00~18:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(17,'20220819','09:00~10:00','[Live] 프로젝트 회고'),(18,'20220819','10:00~12:00','Sub-PJT Ⅲ (자율 coding): 팀별 PJT 진행'),(19,'20220819','13:00~17:00','Sub-PJT Ⅲ 최종평가'),(20,'20220819','17:00~18:00','공통 PJT 마무리: 팀별 진행');
/*!40000 ALTER TABLE `weeklyplan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:41:31
