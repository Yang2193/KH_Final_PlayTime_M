package com.kh.finalPlayTime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter

public class SeatNumbers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "seatNum_Id")
    private Long id;

    private String seatNumber;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    // 생성자, 게터, 세터 등 필요한 메서드 구현


    @Override
    public String toString() {
        return String.valueOf(seatNumber); // Integer를 String으로 변환하여 반환
    }
}
