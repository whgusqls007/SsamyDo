package com.ssljjong.ssachedule.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@DiscriminatorValue("E")
public class EduNotice extends Notice {
}
