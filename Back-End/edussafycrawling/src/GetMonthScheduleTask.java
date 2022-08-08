import org.openqa.selenium.WebElement;

import java.util.*;

public class GetMonthScheduleTask extends ChromeDriverController implements Runnable {
    JDBCDriver jdbcDriver;

    public GetMonthScheduleTask(JDBCDriver jdbcDriver) {
        super();
        this.jdbcDriver = jdbcDriver;
    }

    @Override
    public void run() {
        List<User> userList = jdbcDriver.runQuery("SELECT * FROM user");
        for (int i = 0; i < userList.size(); i++) {
            String email = userList.get(i).getUserName();
            String pw = userList.get(i).getEduPw();
            this.Email = email;
            this.PW = pw;
            startCrawling();
        }
    }

    @Override
    protected void startCrawling() {
        openDriver();
        loginIntoEdussafy();
        ArrayList<ArrayList<Box>> boxes = new ArrayList<>();

        while (true) {
            move("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnMonthlyList.do");

            List<WebElement> list = findElementsByClassName("fc-content-skeleton");

            if (checkStatus(list)) {
                continue;
            }

            for (int i = 0; i < list.size(); i++) {
                WebElement table = list.get(i);
                boxes.add(new ArrayList<Box>());

                List<WebElement> theadTrTd = findElementsByTagName(
                        findElementByTagName(findElementByTagName(table, "thead"), "tr"), "td");

                for (int j = 0; j < theadTrTd.size(); j++) {
                    boxes.get(i).add(new Box(theadTrTd.get(j).getAttribute("data-date")));
                }

                List<WebElement> tbodyTr = findElementsByTagName(findElementByTagName(table, "tbody"), "tr");

                for (int j = 0; j < tbodyTr.size(); j++) {
                    List<WebElement> tbodyTrTd = findElementsByTagName(tbodyTr.get(j), "td");

                    int cnt = -1;
                    for (int k = 0; k < tbodyTrTd.size(); k++) {
                        cnt++;
                        if (boxes.get(i).get(cnt).getRowSpan() != 0) {
                            boxes.get(i).get(cnt).setRowSpan(boxes.get(i).get(cnt).getRowSpan() - 1);
                            k--;
                            continue;
                        }

                        String rowSpan = tbodyTrTd.get(k).getAttribute("rowspan");
                        boxes.get(i).get(cnt).setRowSpan(rowSpan != null ? Integer.parseInt(rowSpan) - 1 : 0);
                        String todo = tbodyTrTd.get(k).getText();
                        boxes.get(i).get(cnt).getList().add(todo);
                    }
                }
            }

            break;
        }

        for (int i = 0; i < boxes.size(); i++) {
            for (int j = 0; j < boxes.get(i).size(); j++) {
                System.out.println(boxes.get(i).get(j).toString());
            }
        }

        closeDriver();
    }
}
