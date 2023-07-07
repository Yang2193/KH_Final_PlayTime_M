package com.kh.finalPlayTime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
//변경
@Entity
@Getter
@Setter
@ToString
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private MemberInfo memberInfo;

    @Column(name = "post_title", length = 100, nullable = false)
    private String postTitle;

    @Lob
    @Column(name = "post_content", nullable = false)
    private String postContent;

    @Column(name = "post_image_url", length = 500)
    private String postImageUrl;

    @Column(name = "post_category", length = 20)
    private String postCategory;

    @Column(name = "post_views")
    private int postViews;

    @Column(name = "post_date")
    private LocalDateTime postDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();


}
