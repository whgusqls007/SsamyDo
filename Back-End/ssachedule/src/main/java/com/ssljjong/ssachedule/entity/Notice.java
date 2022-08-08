package com.ssljjong.ssachedule.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "source")
public abstract class Notice {

    @Id
    @GeneratedValue
    @Column(name = "notice_id")
    private Long id;

    private String title;
    private String description;
    private String date;
    private String file;

    public Notice(Long id, String title, String description, String date, String file) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.file = file;
    }

    public Notice(Long id, String title, String description, String date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }

    public Notice() {

    }
}
