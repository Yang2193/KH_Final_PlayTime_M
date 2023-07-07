package com.kh.finalPlayTime.entity;

import com.kh.finalPlayTime.constant.ReportStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reportId; //신고 번호
    private String nickname; // 신고 당한 사람
    private Long postId; // 어떤 게시글 번호인지
    private Long commentId; // 어떤 댓글의 번호 인지
    private String userId;
    @Column(length = 300)
    private String reportContent; //신고 내용
    private LocalDateTime reportDate; // 신고 날짜
    @Enumerated(EnumType.STRING)
    private ReportStatus reportStatus; //여부

}
