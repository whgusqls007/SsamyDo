package com.ssljjong.ssachedule.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "todo")
public class Todo {

    @Id @GeneratedValue
    @Column(name = "todo_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    private String title;
    private String description;
    private TodoType type;
    private Date    duedate;

    // 연관 메서드
    public void changeDuedate(Date date) {
        this.duedate = date;
    }

    // 생성 메서드
    public static Todo createTodo(Channel channel, String title, String description, TodoType type, Date dueDate) {
        Todo todo = new Todo();
        todo.setChannel(channel);
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setType(type);
        todo.setDuedate(dueDate);
        return todo;
    }


}
