package com.kh.finalPlayTime.kakao.service;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.kakao.constant.SocialOAuth;

import com.kh.finalPlayTime.repository.MemberInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Component
@Transactional
public class KakaoProfileService {
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final MemberInfoRepository memberInfoRepository;
    @Value("${cos.key}")
    private String cosKey;
    public MemberDto getKakaoProfile(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<MultiValueMap<String, String>> memberRequest = new HttpEntity<>(headers);
        ResponseEntity<MemberDto> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                memberRequest,
                MemberDto.class
        );
        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByUserId(String.valueOf(response.getBody().getId()));
        if (!memberInfoOptional.isPresent()) {
            MemberInfo memberInfo = new MemberInfo();
            memberInfo.setUserId(String.valueOf(response.getBody().getId()));
            String encodeCosKey = passwordEncoder.encode(cosKey);
            memberInfo.setUserPw(encodeCosKey);
            memberInfo.setUserName(response.getBody().getKakao_account().getProfile().getNickname());
            memberInfo.setUserEmail(response.getBody().getKakao_account().getEmail());
            memberInfo.setUserNickname(response.getBody().getKakao_account().getProfile().getNickname());
            memberInfo.setSocialOAuth(SocialOAuth.KAKAO);
            memberInfo.setJoinDate(LocalDateTime.now());
            memberInfo.setAuthority(Authority.ROLE_USER);
            memberInfo.setWithdraw(Withdraw.Y);
            memberInfoRepository.save(memberInfo);
            System.out.println("저장 완료");
            return response.getBody();
        } else {
            MemberInfo existingMemberInfo = memberInfoOptional.get();
            return new MemberDto(
                    existingMemberInfo
            );
        }
    }
}