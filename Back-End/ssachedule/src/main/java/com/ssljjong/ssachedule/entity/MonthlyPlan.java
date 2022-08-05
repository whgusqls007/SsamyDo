package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "title", "type", "date"})
@Table(name = "monthlyplan")
public class MonthlyPlan {

    @Id @GeneratedValue
    @Column(name = "mp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    private String title;
    private String type;
    private LocalDate date;

}
