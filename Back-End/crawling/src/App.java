import java.util.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class App {
    static ChromeOptions chromeOptions;
    static ChromeDriver chromeDriver;
    static final String Email = "";
    static final String PW = "";

    public static void main(String[] args) throws Exception {
        initDriver();
        runDriver();
        loginIntoEdussafy();
        getUserCode();
        getMonthSchedule();
        getWeekSchedule();
        closeDriver();
        return;
    }

    public static void getUserCode() throws InterruptedException {
        chromeDriver.get("https://edu.ssafy.com/edu/general/user/userPwdCheckForm.do");
        Thread.sleep(500);
        WebElement elem = chromeDriver.findElement(By.id("currentPwd"));
        elem.sendKeys(PW);
        elem = chromeDriver.findElement(By.id("btnPwdCheck"));
        elem.click();
        Thread.sleep(500);
        elem = chromeDriver
                .findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/form/div/div/div[4]/div[2]/div"));
        System.out.println(elem.getText());
        return;
    }

    public static void getattendanceStatus() {
        return;
    }

    public static void getWeekSchedule() throws InterruptedException {
        chromeDriver.get("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnWeeklyList.do");
        Thread.sleep(500);
        List<WeekBox> weekBoxes = new ArrayList<>();
        List<WebElement> li = chromeDriver.findElement(By.id("_crclmDayTargetId")).findElements(By.tagName("li"));
        for (int i = 0; i < li.size(); i++) {
            String date = li.get(i).findElement(By.className("date")).getText();
            WeekBox weekBox = new WeekBox(date);

            List<WebElement> dl = li.get(i).findElements(By.tagName("dl"));
            for (int j = 0; j < dl.size(); j++) {
                WebElement dt = dl.get(j).findElement(By.tagName("dt"));
                WebElement dd = dl.get(j).findElement(By.tagName("dd"));
                WebElement info = dd.findElement(By.className("info"));
                WebElement cate = info.findElement(By.className("cate"));
                WebElement tit = info.findElement(By.className("tit"));
                WebElement names = tit.findElement(By.className("names"));

                String time = dt.getText();
                String mainSubject = cate.getText();
                String courseName = tit.findElement(By.className("course-name")).getText();
                String subject = tit.findElement(By.className("subj")).getText();
                String name = names.findElement(By.className("name")).getText();
                String classRoom = names.findElement(By.className("class-room")).getText();

                Task task = new Task(time, mainSubject, courseName, subject, name, classRoom);
                weekBox.getTasks().add(task);
            }
            weekBoxes.add(weekBox);
        }

        for (int i = 0; i < weekBoxes.size(); i++) {
            System.out.println(weekBoxes.get(i).toString());
        }
    }

    public static void getMonthSchedule() throws InterruptedException {
        chromeDriver.get("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnMonthlyList.do");
        Thread.sleep(500);
        List<WebElement> list = chromeDriver.findElements(By.className("fc-content-skeleton"));
        ArrayList<ArrayList<Box>> boxes = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            WebElement table = list.get(i);
            boxes.add(new ArrayList<Box>());

            List<WebElement> theadTrTd = table.findElement(By.tagName("thead")).findElement(By.tagName("tr"))
                    .findElements(By.tagName("td"));

            for (int j = 0; j < theadTrTd.size(); j++) {
                boxes.get(i).add(new Box(theadTrTd.get(j).getAttribute("data-date")));
            }

            List<WebElement> tbodyTr = table.findElement(By.tagName("tbody")).findElements(By.tagName("tr"));
            for (int j = 0; j < tbodyTr.size(); j++) {
                List<WebElement> tbodyTrTd = tbodyTr.get(j).findElements(By.tagName("td"));

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

        for (int i = 0; i < boxes.size(); i++) {
            for (int j = 0; j < boxes.get(i).size(); j++) {
                System.out.println(boxes.get(i).get(j).toString());
            }
        }
    }

    public static void loginIntoEdussafy() throws InterruptedException {
        chromeDriver.get("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");
        WebElement elem = chromeDriver.findElement(By.id("userId"));
        elem.sendKeys(Email);
        elem = chromeDriver.findElement(By.id("userPwd"));
        elem.sendKeys(PW);
        elem = chromeDriver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/form/div/div[2]/div[3]/a"));
        elem.click();
        Thread.sleep(500);
        return;
    }

    public static void initDriver() {
        WebDriverManager.chromedriver().setup();

        chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("headless");
        chromeOptions.addArguments("--start-maximized");
        return;
    }

    public static void closeDriver() {
        chromeDriver.quit();
    }

    public static void runDriver() {
        chromeDriver = new ChromeDriver(chromeOptions);
    }
}
