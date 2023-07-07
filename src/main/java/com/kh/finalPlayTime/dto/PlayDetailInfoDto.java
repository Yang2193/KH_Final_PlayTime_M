package com.kh.finalPlayTime.dto;

import lombok.Getter;
import lombok.Setter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PlayDetailInfoDto {
    private String playId; // 연극ID
    private String title; // 연극 이름
    private String theaterName; // 공연장 이름
    private String theaterId; // 공연장 ID

    private String periodStart; // 연극 시작일
    private String periodEnd; // 연극 종료일
    private String playTime; // 연극 런타임

    private String playStatus; // 연극 상태(공연예정/공연중/공연종료)
    private String playPoster; // 연극 포스터
    private String playCast; // 연극 출연진
    private String playAge; // 연극 관람연령
    private String playPrice; // 좌석별 가격(R석 170,000원...)
    private String playDescImg1; // 연극 상세 이미지1
    private String playPlan; // 연극 스케줄

    public PlayDetailInfoDto (JSONObject item){
        List<String> descImg1 = new ArrayList<>();

        Object obj = item.getJSONObject("styurls").get("styurl");
        if (obj instanceof String) {
            descImg1.add(item.getJSONObject("styurls").getString("styurl"));
        } else if(obj instanceof JSONArray) {
            JSONArray jsonArray = item.getJSONObject("styurls").getJSONArray("styurl");
            for (int i = 0; i < jsonArray.length(); i++) {
                descImg1.add((String) jsonArray.get(i));
            }
        }

        this.playId = item.getString("mt20id");
        this.title = item.getString("prfnm");
        this.theaterName = item.getString("fcltynm");
        this.theaterId = item.getString("mt10id");
        this.periodStart = item.getString("prfpdfrom");
        this.periodEnd = item.getString("prfpdto");
        this.playTime = item.getString("prfruntime");
        this.playStatus = item.getString("prfstate");
        this.playPoster = item.getString("poster");
        this.playCast = item.getString("prfcast");
        this.playAge = item.getString("prfage");
        this.playPrice = item.getString("pcseguidance");
        this.playDescImg1 = descImg1.toString();
        this.playPlan = item.getString("dtguidance");
    }
}
