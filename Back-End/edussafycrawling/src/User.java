import java.util.*;

public class User {
    private String userEmail;
    private String userPw;
    private String eduEmail;
    private String eduPw;

    public User() {
    }

    public User(String userEmail, String userPw, String eduEmail, String eduPw) {
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.eduEmail = eduEmail;
        this.eduPw = eduPw;
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPw() {
        return this.userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getEduEmail() {
        return this.eduEmail;
    }

    public void setEduEmail(String eduEmail) {
        this.eduEmail = eduEmail;
    }

    public String getEduPw() {
        return this.eduPw;
    }

    public void setEduPw(String eduPw) {
        this.eduPw = eduPw;
    }

    public User userEmail(String userEmail) {
        setUserEmail(userEmail);
        return this;
    }

    public User userPw(String userPw) {
        setUserPw(userPw);
        return this;
    }

    public User eduEmail(String eduEmail) {
        setEduEmail(eduEmail);
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
        return Objects.equals(userEmail, user.userEmail) && Objects.equals(userPw, user.userPw)
                && Objects.equals(eduEmail, user.eduEmail) && Objects.equals(eduPw, user.eduPw);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, userPw, eduEmail, eduPw);
    }

    @Override
    public String toString() {
        return "{" +
                " userEmail='" + getUserEmail() + "'" +
                ", userPw='" + getUserPw() + "'" +
                ", eduEmail='" + getEduEmail() + "'" +
                ", eduPw='" + getEduPw() + "'" +
                "}";
    }

}
