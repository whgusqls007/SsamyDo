package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "title", "description", "date"})
public class Notice {

    @Id @GeneratedValue
    @Column(name = "notice_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    private String title;
    private String description;
    private LocalDate date;

}
