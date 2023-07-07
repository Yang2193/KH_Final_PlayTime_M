package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.PlayInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.*;

@Repository
public interface PlayInfoRepository extends JpaRepository <PlayInfo, String>{
    Optional<PlayInfo> findByPlayId(String playId);

    List<PlayInfo> findByTitleContaining(String title);
    List<PlayInfo> findByPeriodEndGreaterThan(String date);
    void deleteByPlayId(String playId);
}
