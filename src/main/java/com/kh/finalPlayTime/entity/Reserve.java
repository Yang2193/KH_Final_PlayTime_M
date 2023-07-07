package com.kh.finalPlayTime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reserve_id")
    private Long id; // 예매아이디

    @ManyToOne
    @JoinColumn(name = "play_id")
    private PlayInfo playInfo; // 연극 정보

    @ManyToOne
    @JoinColumn(name = "user_id")
    private MemberInfo memberInfo; // 회원정보

    @Column(name = "reserve_date")
    private LocalDateTime reserveDate; // 예매 일시

    @Column(name = "reserve_time")
    private String time; // 공연 관람일의 시간대(회차)

    @Column(name = "see_date")
    private String seeDate; // 공연 관람일

    @Column(name = "seat_info")
    private String seatInfo; // 좌석 정보

}
