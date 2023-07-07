package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.dto.SeatNumberDto;
import com.kh.finalPlayTime.entity.SeatNumbers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatNumbersRepository extends JpaRepository<SeatNumbers, Long> {
    List<SeatNumbers> findBySeatSeatId(Long seatId);
    void deleteBySeatSeatId(Long seatId);
    List<SeatNumbers> findBySeatTheaterTheaterId (String theaterId);
}
