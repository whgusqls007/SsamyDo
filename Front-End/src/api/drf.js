const HOST = "http://i7e204.p.ssafy.io:8080/api/";

const SIGNUP = "signup";
const TODO = "todo/";
const PLAN = "plan/";
const NOTICE = "notice";
const LUNCH = "lunch/";

export default {
  // POST, credentials = {username: , password: , eduPw: }
  signup: () => HOST + SIGNUP,
  // yearmonth(202207)에 존재하는 모든 ToDo 리스트 조회 =>
  // return [{id, title, Dudate}] → 공지 id (연결된 공지 ID 제공)
  todo: (yearmonth) => HOST + TODO + `${yearmonth}`,
  plan: {
    month: (yearmonth) => HOST + PLAN + `monthly/period/${yearmonth}`,
    weekly: (yearmonthdate) => HOST + PLAN + `weekly/period/${yearmonthdate}`,
  },
  // 모든 공지 내용 조회 params { page, notice per page } 인자?? return??
  notice: () => HOST + NOTICE,

  lunch: {
    // 당일 점심 메뉴 리스트 제공
    today: () => HOST + LUNCH + "today",
    // 해당 날짜 점심 메뉴 리스트 제공 date: "YYYY-MM-DD"
    date: (date) => HOST + LUNCH + `date/${date}/`,
    // 해당 구간 점심 메뉴 리스트 제공
    period: (start, end) => HOST + LUNCH + `${start}/${end}`,
  },
};
