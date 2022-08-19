package edussafycrawlergradle;

import java.time.LocalTime;
import java.util.Calendar;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;

public class App {
    static ChromeOptions chromeOptions;
    static ChromeDriver chromeDriver;

    public static void main(String[] args) throws ClassNotFoundException {
        WebDriverManager.chromedriver().setup();

        JDBCDriver jdbcDriver = new JDBCDriver();
        jdbcDriver.connect();
        ExecutorService service = Executors.newFixedThreadPool(1);

        Boolean thread1 = false;
        Boolean thread2 = false;
        Boolean thread3 = false;
        Boolean thread4 = false;

        while (true) {

            Calendar calendar = Calendar.getInstance();
            int day = calendar.get(Calendar.DAY_OF_WEEK);

            LocalTime localTime = LocalTime.now();
            int hour = localTime.getHour();
            int minute = localTime.getMinute();
            int second = localTime.getSecond();

            if (day == 1 && hour == 1 && minute == 0 && (0 < second && second < 60) &&
                    !thread1) {
                System.out.println("주간일정");
                service.execute(new GetWeekScheduleTask(jdbcDriver, day));
                thread1 = true;
            } else if (day == 1 && hour == 1 && minute == 0 && (0 < second && second < 60) && thread1) {
                // do nothing
            } else {
                thread1 = false;
            }

            if (day == 2 && hour == 1 && minute == 0 && (0 < second && second < 60) &&
                    !thread2) {
                System.out.println("주간일정");
                service.execute(new GetWeekScheduleTask(jdbcDriver, day));
                thread2 = true;
            } else if (day == 2 && hour == 1 && minute == 0 && (0 < second && second < 60) && thread2) {
                // do nothing
            } else {
                thread2 = false;
            }

            if (hour == 1 && minute == 0 && (0 < second && second < 60) && !thread3) {
                System.out.println("설문");
                service.execute(new GetSurveyTask(jdbcDriver));
                thread3 = true;
            } else if (hour == 1 && minute == 0 && (0 < second && second < 60) &&
                    thread3) {
                // do nothing
            } else {
                thread3 = false;
            }

            if (hour == 6 && minute == 0 && (0 < second && second < 60) && !thread4) {
                System.out.println("공지");
                service.execute(new GetNotificationTask(jdbcDriver));
                thread4 = true;
            } else if (hour == 6 && minute == 0 && (0 < second && second < 60) &&
                    thread4) {
                // do nothing
            } else {
                thread4 = false;
            }
        }
    }
}
