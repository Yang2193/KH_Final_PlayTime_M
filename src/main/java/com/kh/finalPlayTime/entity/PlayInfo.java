package com.kh.finalPlayTime.entity;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "play_info")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class PlayInfo {
    @Id
    @Column(name = "play_id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(name = "play_id", length = 10, nullable = false, unique = true)
    private String playId;
    @Column(length = 100)
    private String title;
    @Column(length = 30)
    private String periodStart;
    @Column(length = 30)
    private String periodEnd;
    @Column(length = 500)
    private String imageUrl;
    private String theaterName;

    //DB 저장
    public PlayInfo(JSONObject item){
        this.playId =  item.getString("mt20id");
        this.title =  item.getString("prfnm");
        this.theaterName =  item.getString("fcltynm");
        this.periodStart = item.getString("prfpdfrom");
        this.periodEnd = item.getString("prfpdto");
        this.imageUrl = item.getString("poster");
    }
}
