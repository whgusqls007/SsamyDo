package com.ssljjong.ssachedule.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "monthlyplan")
public class Monthlyplan {

    @Id @GeneratedValue
    @Column(name = "mp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Track track;

    private String title;
    private String type;
    private Date date;

}
