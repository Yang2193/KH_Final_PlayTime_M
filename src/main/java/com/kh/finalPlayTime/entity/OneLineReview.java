package com.kh.finalPlayTime.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

//One-line Review 한줄평 엔티티
@Getter
@Setter
@ToString
@Entity
public class OneLineReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "olr_id")
    private Long id;

    @Column(length = 100, nullable = false)
    private String olrContent;
    private double olrRating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private MemberInfo memberInfo;
    @ManyToOne
    @JoinColumn(name = "play_id")
    private PlayInfo playInfo;
    private LocalDateTime olrDate;

}
