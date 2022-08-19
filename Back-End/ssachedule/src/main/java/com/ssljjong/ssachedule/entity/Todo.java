package com.ssljjong.ssachedule.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = { "id", "title", "description", "type", "dueDate" })
public class Todo {

    @Id
    @GeneratedValue
    @Column(name = "todo_id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "notice_id")
    private Notice notice;

    private String title;
    private String description;
    private TodoType type;

    private String startDate;
    private String dueDate;

    // 연관 메서드
    public void changeDueDate(String date) {
        this.dueDate = date;
    }

    // 생성 메서드

    public Todo(Integer id, Notice notice, String title, String description, TodoType type, String startDate,
            String dueDate) {
        this.id = id;
        this.notice = notice;
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDate = startDate;
        this.dueDate = dueDate;
    }
}
