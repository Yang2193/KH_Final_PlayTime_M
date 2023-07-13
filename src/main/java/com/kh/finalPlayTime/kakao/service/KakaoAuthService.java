package com.kh.finalPlayTime.kakao.service;


import com.kh.finalPlayTime.kakao.constant.OAuth;
import com.kh.finalPlayTime.kakao.dto.KakaoProfile;
import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import com.kh.finalPlayTime.kakao.entity.SocialMember;
import com.kh.finalPlayTime.kakao.repository.SocialMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional
public class KakaoAuthService {
    private final OAuthTokenService oAuthTokenService;
    private final KakaoProfileService kakaoProfileService;
    private final SocialMemberRepository socialMemberRepository;

    public KakaoProfile processKakaoCallback(String code) {
        KakaoTokens kakaoTokens = oAuthTokenService.getKakaoTokens(code);
        KakaoProfile kakaoProfile = kakaoProfileService.getKakaoProfile(kakaoTokens.getAccessToken());
        // 회원 유무 체크
        Optional<SocialMember> existingMember = socialMemberRepository.findByEmailAndOAuth(
                kakaoProfile.getKakao_account().getEmail(), OAuth.KAKAO);
        if (existingMember.isPresent()) {
            // 이미 회원인 경우 처리
            SocialMember member = existingMember.get();
            log.info("이미 회원인 사용자: {}", member);
        } else {
            // 회원이 없는 경우 DB에 추가
            SocialMember newMember = kakaoProfile.toSocialMember();
            SocialMember savedMember = socialMemberRepository.save(newMember);
            log.info("새로운 회원 추가: {}", savedMember);
        }
        return kakaoProfile;
    }
}