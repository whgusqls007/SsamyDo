import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.*;

public class JDBCDriver {
    private String url;
    private String hostname;
    private String password;
    private Connection connection;

    public JDBCDriver() {
        this.url = "jdbc:mysql://stg-yswa-kr-practice-db-master.mariadb.database.azure.com:3306/S07P12E204?serverTimezone=Asia/Seoul&useUnicode=true&characterEncoding=utf8";
        this.hostname = "S07P12E204@stg-yswa-kr-practice-db-master";
        this.password = "F7MCkOqbj8";
    }

    public void connect() {
        try {
            connection = DriverManager.getConnection(url, hostname, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> runQuery(String query) {
        List<User> userList = new ArrayList<>();
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultset = preparedStatement.executeQuery();
            while (resultset.next()) {
                userList.add(new User(resultset.getString(4), resultset.getString(2)));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }

    public int saveWeeklyPlan(String date, Task task) {
        int result = 0;
        String query = "INSERT INTO weeklyplan(date, title, time) values (?, ?, ?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, date);
            preparedStatement.setString(2, task.getSubject());
            preparedStatement.setString(3, task.getTime());
            result = preparedStatement.executeUpdate();
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public int saveNotification(Notification notification) {
        int result = 0;
        String query = "INSERT INTO notice(source, notice_id, date, title) values (?, ?, ?, ?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, "E");
            preparedStatement.setInt(2, notification.getId());
            preparedStatement.setString(3, notification.getDate());
            preparedStatement.setString(4, notification.getTitle());
            result = preparedStatement.executeUpdate();
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public int saveSurvey(Survey survey) {
        int result = 0;
        String query = "INSERT INTO survey(status, title, start_date, due_date, type) values (?, ?, ?, ?, ?)";
        try {
            Boolean isExist = this.getSurvey(survey.getTitle());
            if (isExist) {
                query = "UPDATE survey SET status = ?, title = ?, start_date = ?, due_date = ?, type = ? WHERE title = ?";
            }
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, survey.getStatus());
            preparedStatement.setString(2, survey.getTitle());
            String[] date = survey.getDate().split("~");

            preparedStatement.setString(3, date[0].replaceAll("[^0-9]", ""));
            preparedStatement.setString(4, date[1].replaceAll("[^0-9]", ""));
            preparedStatement.setString(5, survey.getType());
            if (isExist) {
                preparedStatement.setString(6, survey.getTitle());
            }
            result = preparedStatement.executeUpdate();
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public Boolean getSurvey(String title) {
        Boolean result = false;
        String query = "SELECT * FROM survey WHERE title = ?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, title);
            ResultSet resultset = preparedStatement.executeQuery();
            if (resultset.next()) {
                result = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }
}
