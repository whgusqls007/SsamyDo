import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class GetUserCodeTask extends ChromeDriverController implements Runnable {
    public GetUserCodeTask(String email, String pw) {
        super(email, pw);
    }

    @Override
    public void run() {
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

        System.out.println("\n\nThread1 종료\n\n");
        return;
    }
}
