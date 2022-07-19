# README

> SSAFY 7기 부울경캠퍼스 공통2반 4팀

## 프로젝트 개요

1. 주제 및 기간

2. 기획의도 및 컨셉

3. Wireframe

4. DOM Tree

5. 개발 환경 및 사용 기술

6. ERD

7.

8. 주제 :

기간 : 2022년 7월 5일 ~ 22년 8월 19일

#### 1. 주제 및 기간

- 주제 :

- 기간 : 2022년 7월 5일 ~ 22년 8월 19일

#### 2. 기획의도 및 컨셉

- 기획 의도

- 컨셉

- 주요 기능

#### 3. Wireframe

#### 4. DOM Tree

#### 5. 개발 환경 및 사용 기술

- 개발 환경

  - Windows 10, 11

  - Mac

- 개발 도구

  - Visual Studio Code

  - Git

- 커뮤니케이션

  - Mattermost

  - Discord

  - Kakaotalk

  - Notion

- 디자인

  - Figma

- DB

  - Maria DB 10.8.3

- Server

  - AWS EC2

    - Ubuntu 18.04 LTS

- Front-End

  - JavaScript

  - HTML5, CSS3

  - React Native

- Back-End

  - Java open-JDK zulu 8.62.0.19-CA-win64

    - SpringBoot 2.7.1
    - Gradle 7.4.1
    - Lombok
    - JPA, Security, Https, My-batis
      IDE :
    - Visual Studio Code 1.69.1
    - Spring Tool Suite 4 4.15.1.1.RELEASE

- API

  - [Mattermost API](https://api.mattermost.com/)

  - Kakaotalk API

  -

# 구현 기능 정리

날짜: 2022년 7월 19일 오후 4:30
참석자: 강현준(팀장), 김지현, 박지현, 이재준, 전현우, 조현빈

### 처음 시작 (mm 사용자 임을 증명 = 나는 싸피인이다)

- 이메일
- 비밀번호

### 메인 페이지

- to-do-list
  - 기본 모습(리스트 된)
    - 제목
    - 기한
    - 현재 상태
      - 완료
      - 진행 (blue)
      - 종료 (red)
  - 상세내용(요건 클릭하면 볼 수 있게)
    - 내용
    - 생성일자(굳이 필요할까라는 생각은 드는데 일단 넣어봄)
    - 출처
      - MM 링크 제공 여부?
      - 문자인지, mm인지, 에듀싸피인지
    - 공유하기
      - 카카오톡, 메일, 친구에게 보내기(같은 서비스 이용 중인 싸피교육생에게)
    - 중요도?(MM에서 긁어오는 것⇒ MM이니 중요도 최상, 자체 작성은 사용자가 넣기)
      - 마감 일시 기준으로 중요도 매기기?
- 주별 일정 정리

  - 해당 주차 일정 간략하게 작성 (월~금)
    - ex) 대면, 정기면담 신청, 7기 사연함

  ![Untitled](/uploads/8cf5d888ba136f3c68bb2fc0a64e4cec/Untitled.png)

- 월간은 필요없나여 그럼 주간까지만?
  - ⇒ 프론트 맘대루~
  - 월간 데이터가 필요하면 그렇게 맞춰서 넘겨줄 순 있습니다.
  - 휴대폰 화면에 월간 다 넣으면 너무 빡빡해 보이지 않을까요? 저는 주단위로해서 밑으로 스크롤하면 한 주씩 더 생기는? 그런거 생각했는데
    - ⇒ 좋은듯
    - ⇒ 프론트 맘대루 2222
    - ⇒ 해당 주차만 메인 페이지 / 월은 따로 탭을 만들면 너무 불편할까요?
      - 나쁘지 않은듯 합니다.

### 개인페이지

- 기본 인적사항
  - 닉네임 or 이름
  - 기수
  - 트랙
  - 프로필 사진?
    - 프로필 사진은 mm에 설정된거 못긁어 오나요?(좋은 생각이네요)
    - 직접 해보라고요? 네 알겠습니다 ㄱㄷ ⇒ getMe에는 없음 ㄲㅂ
      - 저거 이미지 데이터가 DB에 없어서 힘들지 않을까요?
- 개인 설정
- 밑에껀 공지에 넣는게 맞을듯?
  - 트랙별 공지(MM내 본인 트랙 공지)
    - 트랙 Python , Java 등
    - 자기 반별 공지(Python 부울경 1반, Java 3반 등)
  - 소속팀(스터디 or 모임) 공지
    - 추후 생각해봐요
    - 넵
    - 이거 그냥 어차피 똑같아여 공지사항 긁어오는거랑

### 공지사항

- 공지사항 리스트
  - 제목
  - 날짜
  - 출처
  - 상세페이지
    - 제목
    - 날짜
    - 출처
    - 내용
    - 작성자?
      ![Untitled_1](/uploads/f94e63484e7c0fb0804727f7d6553924/Untitled_1.png)

![Untitled_2](/uploads/4f602c80d988b8b604ecf4bad851c356/Untitled_2.png)

### 페이지 구성 관련 의견 정리

- todolist 보여줄 때 마감기간으로 소팅해서 보여주기
  - 오늘마감이거나 하면 빨간색으로 표시 등
- 여러 기한을 한페이지에 다 보여주면 좋을것같아여

  - 하루 남은거 몇개 / 일주일 남은거 몇개

- to do list만 있되 맨위에 약간 기간 별로 몇개 나와있는지 보여주고 플러스버튼 둬서 본인이 추가할수있는정도만

![Untitled_3](/uploads/e246316ecda26e1ababfc5529f4dbb42/Untitled_3.png)

- 그냥 리스트로 보여주는데 마감기한별로 소팅돼있는게 더 깔끔

- 위에 투두 넣고 아래 이렇게

![Untitled_4](/uploads/6aac291c0486c1a44905c7a51b7bbdb0/Untitled_4.png)

- 메인에는 투두 들어가고 오른쪽 같은 느낌으로 다른 탭 작성

![Untitled_5](/uploads/429c0bbd60b99a3a0d63fff0220c7a0d/Untitled_5.png)
