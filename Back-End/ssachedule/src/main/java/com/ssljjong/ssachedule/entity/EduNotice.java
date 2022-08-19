package com.ssljjong.ssachedule.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Getter;

@Entity
@Getter
@DiscriminatorValue("E")
public class EduNotice extends Notice {
}
