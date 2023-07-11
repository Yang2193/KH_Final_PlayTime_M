package com.kh.finalPlayTime.kakao.service;

import com.kh.finalPlayTime.kakao.entity.SocialMember;
import com.kh.finalPlayTime.kakao.jwt.AuthTokens;
import com.kh.finalPlayTime.kakao.jwt.AuthTokensGenerator;
import com.kh.finalPlayTime.kakao.params.OAuthLoginParams;
import com.kh.finalPlayTime.kakao.repository.SocialMemberRepository;
import com.kh.finalPlayTime.kakao.response.OAuthInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class OAuthLoginService {
    private final SocialMemberRepository socialMemberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        Long memberId = findOrCreateMember(oAuthInfoResponse);
        return authTokensGenerator.generate(memberId);
    }

    private Long findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        return socialMemberRepository.findByEmail(oAuthInfoResponse.getEmail())
                .map(SocialMember::getId)
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }

    private Long newMember(OAuthInfoResponse oAuthInfoResponse) {
        SocialMember member = SocialMember.builder()
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .oAuth(oAuthInfoResponse.getOAuthProvider())
                .build();

        return socialMemberRepository.save(member).getId();
    }
}
