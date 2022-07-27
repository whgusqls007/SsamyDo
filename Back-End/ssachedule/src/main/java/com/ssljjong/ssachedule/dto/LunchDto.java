package com.ssljjong.ssachedule.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LunchDto {

    private Long id;
    private String main;
    private String detail;
    private String img;
    private String store;
    private LocalDate date;

    public LunchDto(Long id, String main, String detail, String img, String store, LocalDate date) {
        this.id = id;
        this.main = main;
        this.detail = detail;
        this.img = img;
        this.store = store;
        this.date = date;
    }
}
