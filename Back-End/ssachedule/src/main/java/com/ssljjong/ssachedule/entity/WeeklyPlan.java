package com.ssljjong.ssachedule.entity;

import com.ssljjong.ssachedule.dto.WeeklyPlanDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

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
