package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.entity.MemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberInfoRepository extends JpaRepository<MemberInfo, String> {
    Optional<MemberInfo> findByUserId(String userId);
    Optional<MemberInfo> findByUserEmail(String userEmail);
    Optional<MemberInfo> findByUserNickname(String userNickname);
    List<MemberInfo> findAll();
    List<MemberInfo> findByUserIdAndUserPw(String userId, String userPw);
    MemberInfo findByUserNameAndUserEmail(String userName, String userEmail);
    Optional<MemberInfo> findByUserIdAndUserNameAndUserEmail(String userId, String userName, String userEmail);
    Optional<MemberInfo> findByAuthority(Authority authority);

    boolean existsByUserEmail(String email);
    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);

}
