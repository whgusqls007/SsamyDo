package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "lunch")
public class Lunch {

    @Id
    @Column(name="lunch_id")
    private Long id;

    private String main;
    private String detail;
    private String img;
    private String store;
    private Date date;
}
