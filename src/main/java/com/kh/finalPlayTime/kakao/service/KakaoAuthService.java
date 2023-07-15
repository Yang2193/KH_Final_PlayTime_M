package com.kh.finalPlayTime.kakao.service;


import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.kakao.constant.SocialOAuth;
import com.kh.finalPlayTime.kakao.dto.KakaoProfile;
import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import com.kh.finalPlayTime.kakao.entity.SocialMember;
import com.kh.finalPlayTime.kakao.jwt.AuthTokens;
import com.kh.finalPlayTime.kakao.jwt.AuthTokensGenerator;
import com.kh.finalPlayTime.kakao.repository.SocialMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional
public class KakaoAuthService {
    private final OAuthTokenService oAuthTokenService;
    private final KakaoProfileService kakaoProfileService;
    private final SocialMemberRepository socialMemberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    public TokenDto processKakaoCallback(String code) {
        KakaoTokens kakaoTokens = oAuthTokenService.getKakaoTokens(code);
        KakaoProfile kakaoProfile = kakaoProfileService.getKakaoProfile(kakaoTokens.getAccessToken());

        Optional<SocialMember> existingMember = socialMemberRepository.findByEmailAndSocialOauth(
                kakaoProfile.getKakao_account().getEmail(), SocialOAuth.KAKAO);

        if (existingMember.isPresent()) {
            SocialMember member = existingMember.get();
            log.info("이미 회원인 사용자: {}", member);

            AuthTokens authTokens = authTokensGenerator.generate(member.getId());

            TokenDto tokenDto = new TokenDto();
            tokenDto.setAccessToken(authTokens.getAccessToken());
            tokenDto.setRefreshToken(authTokens.getRefreshToken());
            tokenDto.setGrantType(authTokens.getGrantType());
            tokenDto.setKakaoProfile(kakaoProfile);
            return tokenDto;
        } else {
            SocialMember newMember = kakaoProfile.toSocialMember();
            SocialMember savedMember = socialMemberRepository.save(newMember);
            log.info("새로운 회원 추가: {}", savedMember);

            AuthTokens authTokens = authTokensGenerator.generate(savedMember.getId());

            TokenDto tokenDto = new TokenDto();
            tokenDto.setAccessToken(authTokens.getAccessToken());
            tokenDto.setRefreshToken(authTokens.getRefreshToken());
            tokenDto.setGrantType(authTokens.getGrantType());
            tokenDto.setKakaoProfile(kakaoProfile);
            return tokenDto;
        }
    }
}