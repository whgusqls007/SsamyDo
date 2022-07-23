import org.openqa.selenium.WebElement;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

public class GetWeekScheduleTask extends ChromeDriverController implements Runnable {
    OutputStream outputStream;

    public GetWeekScheduleTask(String email, String pw, OutputStream fileOutputStream) {
        super(email, pw);
        this.outputStream = fileOutputStream;
    }

    @Override
    public void run() {
        System.out.println("\n\nThread2 시작\n\n");
        openDriver();
        loginIntoEdussafy();
        List<WeekBox> weekBoxes = new ArrayList<>();
        while (true) {
            move("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnWeeklyList.do");

            WebElement elem = findElementById("_crclmDayTargetId");

            if (checkStatus(elem)) {
                continue;
            }

            List<WebElement> li = findElementsByTagName(elem, "li");

            for (int i = 0; i < li.size(); i++) {
                String date = findElementByClassName(li.get(i), "date").getText();
                WeekBox weekBox = new WeekBox(date);

                List<WebElement> dl = findElementsByTagName(li.get(i), "dl");
                for (int j = 0; j < dl.size(); j++) {
                    WebElement dt = findElementByTagName(dl.get(j), "dt");
                    WebElement dd = findElementByTagName(dl.get(j), "dd");
                    WebElement info = findElementByClassName(dd, "info");
                    WebElement cate = findElementByClassName(info, "cate");
                    WebElement tit = findElementByClassName(info, "tit");
                    WebElement names = findElementByClassName(tit, "names");

                    String time = dt.getText();
                    String mainSubject = cate.getText();
                    String courseName = findElementByClassName(tit, "course-name").getText();
                    String subject = findElementByClassName(tit, "subj").getText();
                    String name = findElementByClassName(names, "name").getText();
                    String classRoom = findElementByClassName(names, "class-room").getText();

                    Task task = new Task(time, mainSubject, courseName, subject, name, classRoom);
                    weekBox.getTasks().add(task);
                }
                weekBoxes.add(weekBox);
            }

            break;
        }

        for (int i = 0; i < weekBoxes.size(); i++) {
            try {
                outputStream.write((weekBoxes.get(i).toString() + "\n").getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            outputStream.write("\n".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        closeDriver();
        System.out.println("\n\nThread2 종료\n\n");
        return;
    }
}
