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
    private Integer id;

    private String title;
    private String description;
    private String date;
    private String file_ids;

    @Column(name="source", insertable = false, updatable = false)
    protected String source;

    public String getSource() {
        return source;
    }

    public Notice(Integer id, String title, String description, String date, String file) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.file_ids = file;
    }

    public Notice(Integer id, String title, String description, String date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }

    public Notice(Integer id, String title, String description, String date, String file_ids, String source) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.file_ids = file_ids;
        this.source = source;
    }

    public Notice() {

    }
}
