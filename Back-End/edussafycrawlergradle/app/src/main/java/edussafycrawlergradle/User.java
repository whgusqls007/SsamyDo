package edussafycrawlergradle;

import java.util.Objects;

public class User {
    private String userName;
    private String eduPw;

    public User() {
    }

    public User(String userName, String eduPw) {
        this.userName = userName;
        this.eduPw = eduPw;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEduPw() {
        return this.eduPw;
    }

    public void setEduPw(String eduPw) {
        this.eduPw = eduPw;
    }

    public User userName(String userName) {
        setUserName(userName);
        return this;
    }

    public User eduPw(String eduPw) {
        setEduPw(eduPw);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(userName, user.userName) && Objects.equals(eduPw, user.eduPw);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, eduPw);
    }

    @Override
    public String toString() {
        return "{" +
                " userName='" + getUserName() + "'" +
                ", eduPw='" + getEduPw() + "'" +
                "}";
    }

}
