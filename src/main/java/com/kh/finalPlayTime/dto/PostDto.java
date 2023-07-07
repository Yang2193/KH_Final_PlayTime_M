package com.kh.finalPlayTime.dto;


import com.kh.finalPlayTime.entity.MemberInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
//변경
@Getter
@Setter
public class PostDto {
    private Long id;
    private String userId;
    private MemberInfo memberInfo;
    private String postTitle;
    private String postContent;
    private String postImageUrl;
    private String postCategory;
    private int postViews;
    private LocalDateTime postDate;
}
