package edussafycrawlergradle;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.WebElement;

public class GetWeekScheduleTask extends ChromeDriverController implements Runnable {
    JDBCDriver jdbcDriver;
    int day;

    public GetWeekScheduleTask(JDBCDriver jdbcDriver, int day) {
        super();
        this.jdbcDriver = jdbcDriver;
        this.day = day;
    }

    @Override
    public void run() {
        // User user = jdbcDriver.runQuery("SELECT * FROM user LIMIT 1 OFFSET 0");
        // String email = user.getUserName();
        // String pw = user.getEduPw();
        // this.Email = email;
        // this.PW = pw;
        startCrawling();
    }

    @Override
    protected void startCrawling() {
        openDriver();
        loginIntoEdussafy();
        List<WeekBox> weekBoxes = new ArrayList<>();
        while (true) {
            move("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnWeeklyList.do");
            WebElement elem = null;

            if (this.day == 1) {
                elem = findElementByXpath(
                        "/html/body/div[1]/div[1]/div[2]/div/div/div[3]/div/div[2]/div[1]/div[1]/div[7]");
                elem.click();

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            elem = findElementById("_crclmDayTargetId");

            if (checkStatus(elem)) {
                continue;
            }

            List<WebElement> li = findElementsByTagName(elem, "li");

            for (int i = 0; i < li.size(); i++) {
                String date = findElementByClassName(li.get(i), "date").getText();
                WeekBox weekBox = new WeekBox(date.replaceAll("[^0-9]", ""));

                List<WebElement> dl = findElementsByTagName(li.get(i), "dl");
                for (int j = 0; j < dl.size(); j++) {
                    WebElement dt = findElementByTagName(dl.get(j), "dt");
                    WebElement dd = findElementByTagName(dl.get(j), "dd");
                    WebElement info = findElementByClassName(dd, "info");
                    WebElement cate = findElementByClassName(info, "cate");
                    WebElement tit = findElementByClassName(info, "tit");
                    WebElement names = findElementByClassName(tit, "names");

                    String time = dt.getText();
                    String mainSubject = cate.getText();
                    String courseName = findElementByClassName(tit, "course-name").getText();
                    String subject = findElementByClassName(tit, "subj").getText();
                    String name = findElementByClassName(names, "name").getText();
                    String classRoom = findElementByClassName(names, "class-room").getText();

                    Task task = new Task(time, mainSubject, courseName, subject, name, classRoom);
                    weekBox.getTasks().add(task);
                }
                weekBoxes.add(weekBox);
            }

            break;
        }

        for (int i = 0; i < weekBoxes.size(); i++) {
            WeekBox weekBox = weekBoxes.get(i);
            List<Task> tasks = weekBox.getTasks();

            for (int j = 0; j < tasks.size(); j++) {
                jdbcDriver.saveWeeklyPlan(weekBox.getDate(), tasks.get(j));
            }
        }

        closeDriver();
    }
}
