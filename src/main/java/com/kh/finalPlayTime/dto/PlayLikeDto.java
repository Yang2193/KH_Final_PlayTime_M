package com.kh.finalPlayTime.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlayLikeDto {
    private Long playLikeId;
    private String userId;
    private String playId;

}
