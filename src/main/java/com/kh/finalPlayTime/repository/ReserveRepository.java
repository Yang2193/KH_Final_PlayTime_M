package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.entity.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve,Long> {
    List<Reserve> findByMemberInfoUserId(String userId );
    List<Reserve> findByPlayInfoPlayId(String playId );
    List<Reserve> findAll();

}
