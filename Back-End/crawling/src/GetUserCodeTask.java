import java.io.IOException;
import java.io.OutputStream;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class GetUserCodeTask extends ChromeDriverController implements Runnable {
    OutputStream outputStream;

    public GetUserCodeTask(String email, String pw, OutputStream fileOutputStream) {
        super(email, pw);
        this.outputStream = fileOutputStream;
    }

    @Override
    public void run() {
        System.out.println("\n\nThread1 시작\n\n");
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

        try {
            outputStream.write((elem.getText() + "\n").getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            outputStream.write("\n".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        closeDriver();

        System.out.println("\n\nThread1 종료\n\n");
        return;
    }
}
