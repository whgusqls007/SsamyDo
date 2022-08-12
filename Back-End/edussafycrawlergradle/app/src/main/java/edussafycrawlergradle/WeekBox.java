package edussafycrawlergradle;

import java.util.ArrayList;
import java.util.Objects;

public class WeekBox {
    String date;
    ArrayList<Task> tasks;

    public WeekBox() {
    }

    public WeekBox(String date) {
        this.date = date;
        this.tasks = new ArrayList<>();
    }

    public WeekBox(String date, ArrayList<Task> tasks) {
        this.date = date;
        this.tasks = tasks;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }

    public WeekBox date(String date) {
        setDate(date);
        return this;
    }

    public WeekBox tasks(ArrayList<Task> tasks) {
        setTasks(tasks);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WeekBox)) {
            return false;
        }
        WeekBox weekBox = (WeekBox) o;
        return Objects.equals(date, weekBox.date) && Objects.equals(tasks, weekBox.tasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, tasks);
    }

    @Override
    public String toString() {
        return "{" +
                " date='" + getDate() + "'" +
                ", tasks='" + getTasks() + "'" +
                "}";
    }
}
