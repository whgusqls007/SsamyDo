/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package attendence;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.PushClient;

public class App {
    static HttpUtil httpUtil = new HttpUtil();
    static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    static final String WEB_DRIVER_PATH = "D:/selenium/chromedriver_win32/chromedriver.exe";

    public static void main(String[] args) throws Exception {
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("headless");
        // chromeOptions.addArguments("--start-maximized");
        chromeOptions.addArguments("--window-size=1920x1080");

        WebDriverManager.chromedriver().setup();

        while (true) {
            Calendar calendar = Calendar.getInstance();
            int day = calendar.get(Calendar.DAY_OF_WEEK);

            LocalTime localTime = LocalTime.now();
            int hour = localTime.getHour();
            int minute = localTime.getMinute();
            int second = localTime.getSecond();

            if ((day == 2 || day == 3 || day == 5) && hour == 11 && minute == 50 && second == 0) {
                List<JSONObject> list = httpUtil.apiGet();

                for (int i = 0; i < list.size(); i++) {
                    ChromeDriver chromeDriver = new ChromeDriver(chromeOptions);
                    chromeDriver.get("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");

                    WebElement elem = chromeDriver.findElement(By.id("userId"));
                    elem.sendKeys((String) list.get(i).get("username"));
                    elem = chromeDriver.findElement(By.id("userPwd"));
                    elem.sendKeys((String) list.get(i).get("eduPw"));
                    elem = chromeDriver
                            .findElement(By.xpath("/html/body/div[1]/div/div/div[2]/form/div/div[2]/div[3]/a"));
                    elem.click();
                    String text = null;

                    try {
                        text = chromeDriver
                                .findElement(
                                        By.xpath(
                                                "/html/body/div[1]/div[1]/div[1]/section[1]/div/div[1]/div/div[2]/div[1]"))
                                .getText();
                    } catch (Exception e) {
                        continue;
                    }

                    if (!text.contains("정상 출석")) {
                        String recipient = (String) list.get(i).get("fcmToken");
                        String title = "출석";
                        String message = "하세요";

                        if (!PushClient.isExponentPushToken(recipient))
                            throw new Error("Token:" + recipient + " is not a valid token.");

                        ExpoPushMessage expoPushMessage = new ExpoPushMessage();
                        expoPushMessage.getTo().add(recipient);
                        expoPushMessage.setTitle(title);
                        expoPushMessage.setBody(message);

                        List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
                        expoPushMessages.add(expoPushMessage);

                        PushClient client = new PushClient();

                        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

                        for (List<ExpoPushMessage> chunk : chunks) {
                            client.sendPushNotificationsAsync(chunk);
                        }
                    }
                    chromeDriver.close();
                }
            } else if ((day == 3 || day == 4 || day == 6) && hour == 9 && minute == 20 &&
                    second == 0) {
                List<JSONObject> list = httpUtil.apiGet();

                for (int i = 0; i < list.size(); i++) {
                    ChromeDriver chromeDriver = new ChromeDriver(chromeOptions);
                    chromeDriver.get("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");

                    WebElement elem = chromeDriver.findElement(By.id("userId"));
                    elem.sendKeys((String) list.get(i).get("username"));
                    elem = chromeDriver.findElement(By.id("userPwd"));
                    elem.sendKeys((String) list.get(i).get("eduPw"));
                    elem = chromeDriver
                            .findElement(By.xpath("/html/body/div[1]/div/div/div[2]/form/div/div[2]/div[3]/a"));
                    elem.click();

                    Thread.sleep(1000);
                    String text = null;
                    try {
                        text = chromeDriver
                                .findElement(
                                        By.xpath(
                                                "/html/body/div[1]/div[1]/div[1]/section[1]/div/div[1]/div/div[2]/div[2]"))
                                .getAttribute("class");
                    } catch (Exception e) {
                        continue;
                    }
                    // System.out.println(text);
                    if (!text.contains("outRoomEnd")) {
                        String recipient = (String) list.get(i).get("fcmToken");
                        String title = "퇴첵";
                        String message = "하세요";

                        // System.out.println(recipient + title + message);

                        if (!PushClient.isExponentPushToken(recipient))
                            throw new Error("Token:" + recipient + " is not a valid token.");

                        ExpoPushMessage expoPushMessage = new ExpoPushMessage();
                        expoPushMessage.getTo().add(recipient);
                        expoPushMessage.setTitle(title);
                        expoPushMessage.setBody(message);

                        List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
                        expoPushMessages.add(expoPushMessage);

                        PushClient client = new PushClient();

                        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

                        for (List<ExpoPushMessage> chunk : chunks) {
                            client.sendPushNotificationsAsync(chunk);
                        }
                    }
                    chromeDriver.close();
                }
            }
        }
    }
}