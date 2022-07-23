import org.openqa.selenium.WebElement;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

public class GetMonthScheduleTask extends ChromeDriverController implements Runnable {
    OutputStream outputStream;

    public GetMonthScheduleTask(String email, String pw, OutputStream fileOutputStream) {
        super(email, pw);
        this.outputStream = fileOutputStream;
    }

    @Override
    public void run() {
        System.out.println("\n\nThread3 시작\n\n");
        openDriver();
        loginIntoEdussafy();
        ArrayList<ArrayList<Box>> boxes = new ArrayList<>();

        while (true) {
            move("https://edu.ssafy.com/edu/lectureroom/curriculumn/curriculumnMonthlyList.do");

            List<WebElement> list = findElementsByClassName("fc-content-skeleton");

            if (checkStatus(list)) {
                continue;
            }

            for (int i = 0; i < list.size(); i++) {
                WebElement table = list.get(i);
                boxes.add(new ArrayList<Box>());

                List<WebElement> theadTrTd = findElementsByTagName(
                        findElementByTagName(findElementByTagName(table, "thead"), "tr"), "td");

                for (int j = 0; j < theadTrTd.size(); j++) {
                    boxes.get(i).add(new Box(theadTrTd.get(j).getAttribute("data-date")));
                }

                List<WebElement> tbodyTr = findElementsByTagName(findElementByTagName(table, "tbody"), "tr");

                for (int j = 0; j < tbodyTr.size(); j++) {
                    List<WebElement> tbodyTrTd = findElementsByTagName(tbodyTr.get(j), "td");

                    int cnt = -1;
                    for (int k = 0; k < tbodyTrTd.size(); k++) {
                        cnt++;
                        if (boxes.get(i).get(cnt).getRowSpan() != 0) {
                            boxes.get(i).get(cnt).setRowSpan(boxes.get(i).get(cnt).getRowSpan() - 1);
                            k--;
                            continue;
                        }

                        String rowSpan = tbodyTrTd.get(k).getAttribute("rowspan");
                        boxes.get(i).get(cnt).setRowSpan(rowSpan != null ? Integer.parseInt(rowSpan) - 1 : 0);
                        String todo = tbodyTrTd.get(k).getText();
                        boxes.get(i).get(cnt).getList().add(todo);
                    }
                }
            }

            break;
        }

        for (int i = 0; i < boxes.size(); i++) {
            for (int j = 0; j < boxes.get(i).size(); j++) {
                try {
                    outputStream.write((boxes.get(i).get(j).toString() + "\n").getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        try {
            outputStream.write("\n".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        closeDriver();
        System.out.println("\n\nThread3 종료\n\n");
        return;
    }
}
