package com.kh.finalPlayTime.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private Long id;
    private String commentContent;
    private LocalDateTime commentDate;
    private String userId;
    private String nickname;
    private Long postId;
}
