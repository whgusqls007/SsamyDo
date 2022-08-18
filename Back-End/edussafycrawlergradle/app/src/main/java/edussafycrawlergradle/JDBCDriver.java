package edussafycrawlergradle;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JDBCDriver {
    private String url;
    private String hostname;
    private String password;
    private Connection connection;

    public JDBCDriver() throws ClassNotFoundException {

        this.url = "jdbc:mysql://localhost:3306/ssafy";
        this.hostname = "i7e204";
        this.password = "000000";
        // this.url =
        // "jdbc:mysql://stg-yswa-kr-practice-db-master.mariadb.database.azure.com:3306/S07P12E204?serverTimezone=Asia/Seoul&useUnicode=true&characterEncoding=utf8";
        // this.hostname = "S07P12E204@stg-yswa-kr-practice-db-master";
        // this.password = "F7MCkOqbj8";
    }

    public void connect() throws ClassNotFoundException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(url, hostname, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public User runQuery(String query) {
        User user = null;
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultset = preparedStatement.executeQuery();
            while (resultset.next()) {
                user = new User(resultset.getString(4), resultset.getString(2));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    public int saveWeeklyPlan(String date, Task task) {
        int result = 0;
        String query = "INSERT INTO weeklyplan(date, title, time) values (?, ?, ?)";
        try {
            Boolean isExist = this.getWeeklyPlan(date, task.getTime());
            if (isExist) {
                query = "UPDATE weeklyplan SET date = ?, title = ?, time = ? WHERE date = ? AND time = ?";
            }
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, date);
            preparedStatement.setString(2, task.getSubject());
            preparedStatement.setString(3, task.getTime());
            if (isExist) {
                preparedStatement.setString(4, date);
                preparedStatement.setString(5, task.getTime());
            }
            result = preparedStatement.executeUpdate();
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public Boolean getWeeklyPlan(String date, String time) {
        Boolean result = false;
        String query = "SELECT * FROM weeklyplan WHERE date = ? AND time = ?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, date);
            preparedStatement.setString(2, time);
            ResultSet resultset = preparedStatement.executeQuery();
            if (resultset.next()) {
                result = true;
            }
        } catch (Exception e) {
        }
        return result;
    }

    public int saveNotification(Notification notification) {
        int result = 0;
        String query = "INSERT INTO notice(source, notice_id, date, title) values (?, ?, ?, ?)";
        try {
            Boolean isExist = this.getNotification(notification.getId());
            if (isExist) {
                query = "UPDATE notice SET source = ?, notice_id = ?, date = ?, title = ? WHERE notice_id = ?";
            }
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, "E");
            preparedStatement.setInt(2, notification.getId());
            preparedStatement.setString(3, notification.getDate().replaceAll("[^0-9]", ""));
            preparedStatement.setString(4, notification.getTitle());
            if (isExist) {
                preparedStatement.setInt(5, notification.getId());
            }
            result = preparedStatement.executeUpdate();
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public Boolean getNotification(int noticeId) {
        Boolean result = false;
        String query = "SELECT * FROM notice WHERE notice_id = ?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, noticeId);
            ResultSet resultset = preparedStatement.executeQuery();
            if (resultset.next()) {
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public int saveSurvey(Survey survey) {
        int result = 0;
        String query = "INSERT INTO todo(title, due_date, type, start_date) values (?, ?, ?, ?)";
        try {
            Boolean isExist = this.getSurvey(survey.getTitle());
            if (isExist) {
                query = "UPDATE todo SET title = ?,due_date = ?, type = ?, start_date = ? WHERE title = ?";
            }
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, survey.getTitle());
            // System.out.println(survey.getDate());
            String[] date = survey.getDate().split("~");
            // System.out.println(date);
            preparedStatement.setString(2, date[1].replaceAll("[^0-9]", ""));
            preparedStatement.setInt(3, 1);
            preparedStatement.setString(4, date[0].replaceAll("[^0-9]", ""));
            if (isExist) {
                preparedStatement.setString(5, survey.getTitle());
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
        String query = "SELECT * FROM todo WHERE title = ?";
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
