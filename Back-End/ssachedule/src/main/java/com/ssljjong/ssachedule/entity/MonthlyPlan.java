package com.ssljjong.ssachedule.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = { "id", "title", "type", "date" })
@Table(name = "monthlyplan")
public class MonthlyPlan {

    @Id
    @GeneratedValue
    @Column(name = "mp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    private String title;
    private String type;
    private LocalDate date;

}
