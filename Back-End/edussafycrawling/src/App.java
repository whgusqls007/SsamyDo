import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    static ChromeOptions chromeOptions;
    static ChromeDriver chromeDriver;

    public static void main(String[] args) throws Exception {
        WebDriverManager.chromedriver().setup();
        JDBCDrivcr jdbcDrivcr = new JDBCDrivcr();
        OutputStream outputStream = new FileOutputStream(new File("./output.txt"));
        jdbcDrivcr.connect();
        List<User> userList = jdbcDrivcr.runQuery("SELECT * FROM user");
        System.out.println(userList.toString());
        ExecutorService service = Executors.newFixedThreadPool(3);

        for (int i = 0; i < userList.size(); i++) {
            String email = userList.get(i).getEduEmail();
            String pw = userList.get(i).getEduPw();

            service.execute(new GetMonthScheduleTask(email, pw, outputStream));
            service.execute(new GetUserCodeTask(email, pw, outputStream));
            service.execute(new GetWeekScheduleTask(email, pw, outputStream));
        }
        service.shutdown();
        return;
    }
}
