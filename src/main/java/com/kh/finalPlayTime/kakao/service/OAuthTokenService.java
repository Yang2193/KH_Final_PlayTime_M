package com.kh.finalPlayTime.kakao.service;

import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class OAuthTokenService {
    private final RestTemplate restTemplate;

    public KakaoTokens getKakaoTokens(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "088a7b267c39d0a11ec3904372ed9d33");
        params.add("redirect_uri", "http://localhost:8111/auth/kakao/callback");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<KakaoTokens> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                KakaoTokens.class
        );
        System.out.println("카카오 엑세스토큰 : " + response.getBody().getAccessToken());
        return response.getBody();
    }
}