import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class App {
    static ChromeOptions chromeOptions;
    static ChromeDriver chromeDriver;

    public static void main(String[] args) throws Exception {

        JDBCDrivcr jdbcDrivcr = new JDBCDrivcr();
        jdbcDrivcr.connect();
        User user = jdbcDrivcr.runQuery("SELECT * FROM user");

        String email = user.getEduEmail();
        String pw = user.getEduPw();

        Runnable getWeekScheduleTask = new GetWeekScheduleTask(email, pw);
        Thread getWeekScheduleThread = new Thread(getWeekScheduleTask);

        Runnable getMonthScheduleTask = new GetMonthScheduleTask(email, pw);
        Thread getMonthSchduleThread = new Thread(getMonthScheduleTask);

        Runnable getUserCodeTask = new GetUserCodeTask(email, pw);
        Thread getUserCodeThread = new Thread(getUserCodeTask);

        getWeekScheduleThread.start();
        System.out.println("\n\nThread2 시작\n\n");

        getUserCodeThread.start();
        System.out.println("\n\nThread1 시작\n\n");

        getMonthSchduleThread.start();
        System.out.println("\n\nThread3 시작\n\n");

        return;
    }
}
