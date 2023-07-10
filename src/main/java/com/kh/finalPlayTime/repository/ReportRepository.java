package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByReportId(Long id);
    void deleteByUserId(String userId);

}

