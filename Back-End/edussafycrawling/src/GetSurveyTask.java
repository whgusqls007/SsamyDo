import org.openqa.selenium.WebElement;

import java.util.*;

public class GetSurveyTask extends ChromeDriverController implements Runnable {
	JDBCDriver jdbcDriver;

	public GetSurveyTask(JDBCDriver jdbcDriver) {
		super();
		this.jdbcDriver = jdbcDriver;
	}

	@Override
	public void run() {
		List<User> userList = jdbcDriver.runQuery("SELECT * FROM user");

		for (int i = 0; i < userList.size(); i++) {
			String email = userList.get(i).getEduEmail();
			String pw = userList.get(i).getEduPw();
			this.Email = email;
			this.PW = pw;
			startCrawling();
		}
	}

	@Override
	protected void startCrawling() {
		openDriver();
		loginIntoEdussafy();

		// WebElement elem = null;
		while (true) {
			move("https://edu.ssafy.com/edu/lectureroom/survey/surveyList.do");

			WebElement ul = findElementByClassName("my-quest-list");
			if (checkStatus(ul)) {
				continue;
			}

			List<WebElement> lis = findElementsByTagName(ul, "li");

			for (int i = 0; i < lis.size(); i++) {
				Survey survey = new Survey();
				WebElement li = lis.get(i);
				survey.setStatus(findElementByTagName(li, "Strong").getText());
				WebElement mqlinfor = findElementByClassName(li, "mql-infor");
				WebElement mqltt = findElementByClassName(mqlinfor, "mql-tt");
				survey.setTitle(findElementByClassName(mqltt, "tit").getText());
				survey.setDate(findElementByClassName(mqltt, "txt").getText());
				survey.setType(findElementByClassName(mqlinfor, "mql-point").getText());
				System.out.println(survey);
			}

			break;
		}
		closeDriver();
	}

}
