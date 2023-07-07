package com.kh.finalPlayTime.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.JSONObject;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayInfoDto {
    private String playId;
    private String title;
    private String periodStart;
    private String periodEnd;
    private String theaterName;
    private String imageUrl;

    public PlayInfoDto(JSONObject item){
        this.playId =  item.getString("mt20id");
        this.title =  item.getString("prfnm");
        this.theaterName =  item.getString("fcltynm");
        this.periodStart = item.getString("prfpdfrom");
        this.periodEnd = item.getString("prfpdto");
        this.imageUrl = item.getString("poster");
    }
}
