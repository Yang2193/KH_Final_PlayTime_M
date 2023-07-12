package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.OneLineReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OneLineReviewRepository extends JpaRepository<OneLineReview,Long> {
    List<OneLineReview> findByPlayInfoPlayId(String playId);
}
