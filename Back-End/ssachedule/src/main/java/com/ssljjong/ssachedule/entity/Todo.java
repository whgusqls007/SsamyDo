package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "title", "description", "type", "dueDate"})
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
    private LocalDate dueDate;

    // 연관 메서드
    public void changeDuedate(LocalDate date) {
        this.dueDate = date;
    }

    // 생성 메서드
    public static Todo createTodo(Channel channel, String title, String description, TodoType type, LocalDate dueDate) {
        Todo todo = new Todo();
        todo.setChannel(channel);
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setType(type);
        todo.setDueDate(dueDate);
        return todo;
    }


}
