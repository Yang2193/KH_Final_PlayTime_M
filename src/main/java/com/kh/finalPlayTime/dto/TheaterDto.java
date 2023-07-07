package com.kh.finalPlayTime.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;

import java.math.BigDecimal;

@Data
@RequiredArgsConstructor
public class TheaterDto {
    private String theaterId; // 공연시설 ID
    private String theaterName; // 공연시설명
    private String theaterAddr; // 주소
    private int theaterSeats; // 객석 수
    private String theaterCall; // 연락처
    private String theaterWeb; // 홈페이지
    private BigDecimal theaterLat; // 위도
    private BigDecimal theaterLon; // 경도

    // api DTO에 저장
    public TheaterDto (JSONObject item) {
        this.theaterId = item.getString("mt10id");
        this.theaterName = item.getString("fcltynm");
        this.theaterAddr = item.getString("adres");
        this.theaterSeats = item.getInt("seatscale");
        this.theaterCall = item.getString("telno");
        this.theaterWeb = item.getString("relateurl");
        this.theaterLat = item.getBigDecimal("la");
        this.theaterLon = item.getBigDecimal("lo");
    }
}