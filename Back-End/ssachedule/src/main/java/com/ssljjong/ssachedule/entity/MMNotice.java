package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

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
