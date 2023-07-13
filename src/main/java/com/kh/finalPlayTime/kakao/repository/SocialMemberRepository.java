package com.kh.finalPlayTime.kakao.repository;

import com.kh.finalPlayTime.kakao.constant.OAuth;
import com.kh.finalPlayTime.kakao.entity.SocialMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocialMemberRepository extends JpaRepository<SocialMember, Long> {
    Optional<SocialMember> findByEmail(String email);
    Optional<SocialMember> findByEmailAndOAuth(String email, OAuth oAuth);
}
