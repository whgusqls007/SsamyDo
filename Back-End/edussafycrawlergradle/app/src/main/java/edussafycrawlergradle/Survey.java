package edussafycrawlergradle;

import java.util.Objects;

public class Survey {
  String status;
  String title;
  String date;
  String type;

  public Survey() {
  }

  public Survey(String status, String title, String date, String type) {
    this.status = status;
    this.title = title;
    this.date = date;
    this.type = type;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
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

  public String getType() {
    return this.type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Survey status(String status) {
    setStatus(status);
    return this;
  }

  public Survey title(String title) {
    setTitle(title);
    return this;
  }

  public Survey date(String date) {
    setDate(date);
    return this;
  }

  public Survey type(String type) {
    setType(type);
    return this;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof Survey)) {
      return false;
    }
    Survey survey = (Survey) o;
    return Objects.equals(status, survey.status) && Objects.equals(title, survey.title)
        && Objects.equals(date, survey.date) && Objects.equals(type, survey.type);
  }

  @Override
  public int hashCode() {
    return Objects.hash(status, title, date, type);
  }

  @Override
  public String toString() {
    return "{" +
        " status='" + getStatus() + "'" +
        ", title='" + getTitle() + "'" +
        ", date='" + getDate() + "'" +
        ", type='" + getType() + "'" +
        "}";
  }

}
