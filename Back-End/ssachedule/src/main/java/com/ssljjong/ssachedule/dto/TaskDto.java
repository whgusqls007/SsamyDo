package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class TaskDto {
    String time;
    String mainSubject;
    String courseName;
    String subject;
    String name;
    String classRoom;

    public TaskDto() {
    }

    public TaskDto(String time, String mainSubject, String courseName, String subject, String name, String classRoom) {
        this.time = time;
        this.mainSubject = mainSubject;
        this.courseName = courseName;
        this.subject = subject;
        this.name = name;
        this.classRoom = classRoom;
    }
}