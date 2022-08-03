package com.ssljjong.ssachedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "title", "type", "date"})
@Table(name = "weeklyplan")
public class WeeklyPlan {
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
