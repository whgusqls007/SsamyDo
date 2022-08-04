package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@DiscriminatorValue("M")
public class MMNotice extends Notice {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;
}
