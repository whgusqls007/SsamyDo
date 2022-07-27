package com.ssljjong.ssachedule.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Lunch {

    @Id @GeneratedValue
    @Column(name="lunch_id")
    private Long id;

    private String main;
    private String detail;
    private Date date;
    private Store store;
}
