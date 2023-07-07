package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    Optional<Seat> findByTheaterTheaterId(String theaterId);
    boolean existsByTheaterTheaterId(String theaterId);
}
