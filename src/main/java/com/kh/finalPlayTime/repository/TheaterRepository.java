package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TheaterRepository extends JpaRepository<Theater, String> {

}
