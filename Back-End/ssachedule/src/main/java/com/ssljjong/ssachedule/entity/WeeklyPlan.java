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
@ToString(of = {"id", "title", "type", "date"})
@Table(name = "weeklyplan")
public class WeeklyPlan {
        @Id
        @GeneratedValue
        @Column(name = "wp_id")
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        private Track track;

        private String title;
        private String type;
        private String date;
        private String time;


}
