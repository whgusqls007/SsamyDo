package com.ssljjong.ssachedule.domain;

import lombok.Getter;
import org.apache.ibatis.annotations.One;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "notice")
public class Notice {

    @Id @GeneratedValue
    @Column(name = "notice_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    private String title;
    private String description;
    private Date date;

}
