package edussafycrawlergradle;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class GetUserCodeTask extends ChromeDriverController implements Runnable {
    JDBCDriver jdbcDriver;

    public GetUserCodeTask(JDBCDriver jdbcDriver) {
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

        WebElement elem = null;

        while (true) {
            move("https://edu.ssafy.com/edu/general/user/userPwdCheckForm.do");

            elem = findElementById("currentPwd");

            if (checkStatus(elem)) {
                continue;
            }

            elem.sendKeys(PW);
            elem = chromeDriver.findElement(By.id("btnPwdCheck"));

            if (checkStatus(elem)) {
                continue;
            }

            elem.click();

            elem = findElementByXpath("/html/body/div[1]/div[1]/div[2]/div[2]/form/div/div/div[4]/div[2]/div");

            if (checkStatus(elem)) {
                continue;
            }

            break;
        }

        System.out.println(elem.getText());

        closeDriver();
    }
}
