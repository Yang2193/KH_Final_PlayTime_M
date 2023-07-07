package com.kh.finalPlayTime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter@Setter@ToString
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seatId;

    @OneToOne
    @JoinColumn(name = "theater_id")
    private Theater theater;

    @OneToMany(mappedBy = "seat")
    private List<SeatNumbers> seatNumbersList= new ArrayList<>();
}

