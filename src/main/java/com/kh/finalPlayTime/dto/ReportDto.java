package com.kh.finalPlayTime.dto;

import com.kh.finalPlayTime.constant.ReportStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReportDto {
    private Long reportId; // 신고 번호
    private String nickname; // 신고 한 사람의 닉네임
    private String reportUserId; // 신고 한 사람의 닉네임

    private Long postId; // 게시글 번호
    private Long commentId; // 댓글 번호
    private String reportContent; // 신고 내용
    private String reportDate;
    private String reportStatus;
}
