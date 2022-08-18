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
@ToString(of = { "id", "title", "date" })
@Table(name = "weeklyplan")
public class WeeklyPlan {
        @Id
        @GeneratedValue
        @Column(name = "wp_id")
        private Long id;

        private String title;
        private String date;
        private String time;

}
