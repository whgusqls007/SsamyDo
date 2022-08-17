const HOST = "http://i7e204.p.ssafy.io:8080/api/";
const TODO = "todo/";
const PLAN = "plan/weekly/";
const NOTICE = "notice/";
const LUNCH = "lunch/";

export default {
  user: {
    // POST, credentials = {username: , password: , eduPw: }
    login: () => HOST + "login",
    // POST, credentials = {username: , password: , eduPw: }
    signup: () => HOST + "signup",
    // POST, credentials = {gi: , trackName: ,}
    track: () => HOST + "track/change",
    // 탈퇴
    delete: () => HOST + "user/delete",
  },
  // yearmonth(202207)에 존재하는 모든 ToDo 리스트 조회 =>
  // return [{id, title, Dudate}] → 공지 id (연결된 공지 ID 제공)
  todo: () => HOST + "todo/todolist/",
  plan: {
    date: (date) => HOST + PLAN + `date/${date}`,
    weekly: (startDate) => HOST + PLAN + `period/${startDate}`,
    period: (startDate, endDate) =>
      HOST + PLAN + `period/${startDate}/${endDate}`,
  },
  // 모든 공지 내용 조회 params { page, notice per page } 인자?? return??
  notice: {
    noticeOffset: (offset, size) => HOST + NOTICE + `offset/${offset}/${size}`,
    noticePage: (page) => HOST + NOTICE + `page/${page}`,
  },

  lunch: {
    // 당일 점심 메뉴 리스트 제공
    today: () => HOST + LUNCH + "today",
    // 해당 날짜 점심 메뉴 리스트 제공 date: "YYYY-MM-DD"
    date: (date) => HOST + LUNCH + `date/${date}`,
    // 해당 구간 점심 메뉴 리스트 제공
    period: (start, end) => HOST + LUNCH + `period/${start}/${end}`,
  },
};
