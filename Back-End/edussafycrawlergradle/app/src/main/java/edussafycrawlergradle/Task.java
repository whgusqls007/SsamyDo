package edussafycrawlergradle;

import java.util.Objects;

public class Task {
    String time;
    String mainSubject;
    String courseName;
    String subject;
    String name;
    String classRoom;

    public Task() {
    }

    public Task(String time, String mainSubject, String courseName, String subject, String name, String classRoom) {
        this.time = time;
        this.mainSubject = mainSubject;
        this.courseName = courseName;
        this.subject = subject;
        this.name = name;
        this.classRoom = classRoom;
    }

    public String getTime() {
        return this.time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMainSubject() {
        return this.mainSubject;
    }

    public void setMainSubject(String mainSubject) {
        this.mainSubject = mainSubject;
    }

    public String getCourseName() {
        return this.courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClassRoom() {
        return this.classRoom;
    }

    public void setClassRoom(String classRoom) {
        this.classRoom = classRoom;
    }

    public Task time(String time) {
        setTime(time);
        return this;
    }

    public Task mainSubject(String mainSubject) {
        setMainSubject(mainSubject);
        return this;
    }

    public Task courseName(String courseName) {
        setCourseName(courseName);
        return this;
    }

    public Task subject(String subject) {
        setSubject(subject);
        return this;
    }

    public Task name(String name) {
        setName(name);
        return this;
    }

    public Task classRoom(String classRoom) {
        setClassRoom(classRoom);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Task)) {
            return false;
        }
        Task task = (Task) o;
        return Objects.equals(time, task.time) && Objects.equals(mainSubject, task.mainSubject)
                && Objects.equals(courseName, task.courseName) && Objects.equals(subject, task.subject)
                && Objects.equals(name, task.name) && Objects.equals(classRoom, task.classRoom);
    }

    @Override
    public int hashCode() {
        return Objects.hash(time, mainSubject, courseName, subject, name, classRoom);
    }

    @Override
    public String toString() {
        return "{" +
                " time='" + getTime() + "'" +
                ", mainSubject='" + getMainSubject() + "'" +
                ", courseName='" + getCourseName() + "'" +
                ", subject='" + getSubject() + "'" +
                ", name='" + getName() + "'" +
                ", classRoom='" + getClassRoom() + "'" +
                "}";
    }
}
