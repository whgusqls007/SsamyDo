package edussafycrawlergradle;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.WebElement;

public class GetNotificationTask extends ChromeDriverController implements Runnable {
    JDBCDriver jdbcDriver;

    public GetNotificationTask(JDBCDriver jdbcDriver) {
        super();
        this.jdbcDriver = jdbcDriver;
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
        List<Notification> list = new ArrayList<>();
        while (true) {
            move("https://edu.ssafy.com/edu/board/notice/list.do");

            List<WebElement> tables = findElementsByClassName("default-tbl");

            if (checkStatus(tables)) {
                continue;
            }

            WebElement table = tables.get(0);

            WebElement tbody = findElementByTagName(table, "tbody");

            List<WebElement> trs = findElementsByTagName(tbody, "tr");

            for (int i = 0; i < trs.size(); i++) {
                Notification notification = new Notification();
                notification.setType(1);
                WebElement tr = trs.get(i);

                List<WebElement> tds = findElementsByTagName(tr, "td");

                WebElement td = tds.get(1);

                WebElement a = findElementByTagName(td, "a");

                String[] str = a.getAttribute("onClick").split("'");
                notification.setId(Integer.parseInt(str[1]));

                notification.setTitle(a.getText());

                notification.setDate(tds.get(2).getText());

                list.add(notification);
            }

            table = tables.get(1);

            tbody = findElementByTagName(table, "tbody");

            trs = findElementsByTagName(tbody, "tr");

            for (int i = 0; i < trs.size(); i++) {
                Notification notification = new Notification();
                notification.setType(0);
                WebElement tr = trs.get(i);

                List<WebElement> tds = findElementsByTagName(tr, "td");

                WebElement td = tds.get(1);

                WebElement a = findElementByTagName(td, "a");

                String[] str = a.getAttribute("onClick").split("'");
                notification.setId(Integer.parseInt(str[1]));

                notification.setTitle(a.getText());

                notification.setDate(tds.get(2).getText());

                list.add(notification);
            }

            break;
        }

        for (int i = 0; i < list.size(); i++) {
            jdbcDriver.saveNotification(list.get(i));
        }

        closeDriver();
    }
}