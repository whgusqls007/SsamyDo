package edussafycrawlergradle;

import java.util.*;

public class Box {
    String date;
    ArrayList<String> list;
    int rowSpan;

    public Box() {
    }

    public Box(String date) {
        this.list = new ArrayList<>();
        this.date = date;
        this.rowSpan = 0;
    }

    public Box(String date, ArrayList<String> list, int rowSpan) {
        this.date = date;
        this.list = list;
        this.rowSpan = rowSpan;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<String> getList() {
        return this.list;
    }

    public void setList(ArrayList<String> list) {
        this.list = list;
    }

    public int getRowSpan() {
        return this.rowSpan;
    }

    public void setRowSpan(int rowSpan) {
        this.rowSpan = rowSpan;
    }

    public Box date(String date) {
        setDate(date);
        return this;
    }

    public Box list(ArrayList<String> list) {
        setList(list);
        return this;
    }

    public Box rowSpan(int rowSpan) {
        setRowSpan(rowSpan);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Box)) {
            return false;
        }
        Box box = (Box) o;
        return Objects.equals(date, box.date) && Objects.equals(list, box.list) && rowSpan == box.rowSpan;
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, list, rowSpan);
    }

    @Override
    public String toString() {
        return "{" +
                " date='" + getDate() + "'" +
                ", list='" + getList() + "'" +
                ", rowSpan='" + getRowSpan() + "'" +
                "}";
    }

}