package com.example.demo;

import java.util.List;

import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.service.HttpUtil;

import io.github.bonigarcia.wdm.WebDriverManager;

@SpringBootApplication
public class DemoApplication {

	static HttpUtil httpUtil = new HttpUtil();
	static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
	static final String WEB_DRIVER_PATH = "D:/selenium/chromedriver_win32/chromedriver.exe";

	public static void main(String[] args) throws Exception {
		ChromeOptions chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("headless");
		// chromeOptions.addArguments("--start-maximized");
		chromeOptions.addArguments("--window-size=1920x1080");

		WebDriverManager.chromedriver().setup();

		// while (true) {

		List<JSONObject> list = httpUtil.apiGet();

		for (int i = 0; i < list.size(); i++) {
			ChromeDriver chromeDriver = new ChromeDriver(chromeOptions);
			chromeDriver.get("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");

			WebElement elem = chromeDriver.findElement(By.id("userId"));
			elem.sendKeys((String) list.get(i).get("username"));
			elem = chromeDriver.findElement(By.id("userPwd"));
			elem.sendKeys((String) list.get(i).get("eduPw"));
			elem = chromeDriver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/form/div/div[2]/div[3]/a"));
			elem.click();

			String text = chromeDriver
					.findElement(By.xpath("/html/body/div[1]/div[1]/div[1]/section[1]/div/div[1]/div/div[2]/div[1]/span"))
					.getText();
			System.out.println(text);
			chromeDriver.quit();
		}

		// }
	}

}
