import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.time.LocalTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    static ChromeOptions chromeOptions;
    static ChromeDriver chromeDriver;

    public static void main(String[] args) throws Exception {

        WebDriverManager.chromedriver().setup();
        OutputStream outputStream = new FileOutputStream(new File("./output.txt"));
        JDBCDriver jdbcDriver = new JDBCDriver();
        jdbcDriver.connect();
        ExecutorService service = Executors.newFixedThreadPool(2);
        Boolean thread1 = false;
        Boolean thread2 = false;
        Boolean thread3 = false;
        while (true) {
            LocalTime localTime = LocalTime.now();
            int minute = localTime.getMinute();
            int second = localTime.getSecond();

            if (minute % 1 == 0 && (0 < second && second < 60) && !thread1) {

                service.execute(new GetUserCodeTask("email", "pw", outputStream, jdbcDriver));
                thread1 = true;
            } else if (minute % 1 == 0 && (0 < second && second < 60) && thread1) {
                // do nothing
            } else {
                thread1 = false;
            }

            if (minute % 2 == 0 && (0 < second && second < 60) && !thread2) {

                service.execute(new GetMonthScheduleTask("email", "pw", jdbcDriver));
                thread2 = true;
            } else if (minute % 2 == 0 && (0 < second && second < 60) && thread2) {
                // do nothing
            } else {
                thread2 = false;
            }

            if (minute % 3 == 0 && (0 < second && second < 60) && !thread3) {

                service.execute(new GetWeekScheduleTask("email", "pw", jdbcDriver));
                thread3 = true;
            } else if (minute % 3 == 0 && (0 < second && second < 60) && thread3) {
                // do nothing
            } else {
                thread3 = false;
            }
        }
    }
}