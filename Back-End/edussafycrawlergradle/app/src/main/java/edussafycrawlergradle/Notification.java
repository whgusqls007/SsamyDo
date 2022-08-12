package edussafycrawlergradle;

import java.util.Objects;

public class Notification {
    int id;
    int type;
    String title;
    String date;

    public Notification() {
    }

    public Notification(int id, int type, String title, String date) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.date = date;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getType() {
        return this.type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Notification id(int id) {
        setId(id);
        return this;
    }

    public Notification type(int type) {
        setType(type);
        return this;
    }

    public Notification title(String title) {
        setTitle(title);
        return this;
    }

    public Notification date(String date) {
        setDate(date);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Notification)) {
            return false;
        }
        Notification notification = (Notification) o;
        return id == notification.id && type == notification.type && Objects.equals(title, notification.title)
                && Objects.equals(date, notification.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, title, date);
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", type='" + getType() + "'" +
                ", title='" + getTitle() + "'" +
                ", date='" + getDate() + "'" +
                "}";
    }

}
