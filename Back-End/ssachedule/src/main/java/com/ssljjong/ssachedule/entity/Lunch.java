package com.ssljjong.ssachedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "main", "detail", "img", "store", "date"})
@Table(name = "lunch")
public class Lunch {

    @Id @GeneratedValue
    @Column(name="lunch_id")
    private Long id;

    private String main;
    private String detail;
    private String img;
    private String store;
    private LocalDate date;
}
