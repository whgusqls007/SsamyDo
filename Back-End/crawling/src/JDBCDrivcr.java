import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JDBCDrivcr {
    private String url;
    private String hostname;
    private String password;
    private Connection connection;

    public JDBCDrivcr() {
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

    public User runQuery(String query) {
        User user = new User();
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultset = preparedStatement.executeQuery();
            if (resultset.next()) {
                user.setUserEmail(resultset.getString(1));
                user.setUserPw(resultset.getString(2));
                user.setEduEmail(resultset.getString(3));
                user.setEduPw(resultset.getString(4));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}
