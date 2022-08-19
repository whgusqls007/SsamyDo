package com.ssljjong.ssachedule.dto;

import lombok.Data;

@Data
public class LunchDto {

    private Integer id;
    private String main;
    private String detail;
    private String img;
    private String store;
    private String date;

    public LunchDto(Integer id, String main, String detail, String img, String store, String date) {
        this.id = id;
        this.main = main;
        this.detail = detail;
        this.img = img;
        this.store = store;
        this.date = date;
    }
}
