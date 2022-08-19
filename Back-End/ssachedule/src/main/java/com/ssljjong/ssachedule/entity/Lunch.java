package com.ssljjong.ssachedule.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = { "id", "main", "detail", "img", "store", "date" })
@Table(name = "lunch")
public class Lunch {

    @Id
    @GeneratedValue
    @Column(name = "lunch_id")
    private Integer id;

    private String main;
    private String detail;
    private String img;
    private String store;
    private String date;

    public Lunch(String main, String detail, String img, String store, String date) {
        this.main = main;
        this.detail = detail;
        this.img = img;
        this.store = store;
        this.date = date;
    }
}
