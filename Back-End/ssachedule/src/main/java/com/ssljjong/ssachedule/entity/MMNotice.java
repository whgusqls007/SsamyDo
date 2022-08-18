package com.ssljjong.ssachedule.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;

@Entity
@Getter
@DiscriminatorValue("M")
public class MMNotice extends Notice {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    public MMNotice(Integer id, String title, String description, String date, String file, Channel channel) {
        super(id, title, description, date, file);
        this.channel = channel;
    }

    public MMNotice() {
        super();
    }
}
