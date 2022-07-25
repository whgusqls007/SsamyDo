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
                userList.add(new User(resultset.getString(1), resultset.getString(2), resultset.getString(3),
                        resultset.getString(4)));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }
}
