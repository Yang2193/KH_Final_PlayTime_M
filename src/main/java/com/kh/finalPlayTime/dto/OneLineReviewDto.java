package com.kh.finalPlayTime.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OneLineReviewDto {
    private Long olrId;
    private String olrContent;
    private double olrRating;
    private String userId;
    private String playId;
    private LocalDateTime olrDate;

}
