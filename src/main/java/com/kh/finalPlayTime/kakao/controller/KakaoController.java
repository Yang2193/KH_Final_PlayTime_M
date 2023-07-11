package com.kh.finalPlayTime.kakao.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import com.kh.finalPlayTime.kakao.jwt.AuthTokens;
import com.kh.finalPlayTime.kakao.params.KakaoLoginParams;
import com.kh.finalPlayTime.kakao.service.OAuthLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class KakaoController {
    private final OAuthLoginService oAuthLoginService;

//    @PostMapping("/kakao/callback")
//    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
//        return ResponseEntity.ok(oAuthLoginService.login(params));
//    }
    @GetMapping("/kakao/callback")
    public @ResponseBody String kakaoCallback(String code) {
        RestTemplate rt = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "088a7b267c39d0a11ec3904372ed9d33");
        params.add("redirect_uri", "http://localhost:8111/auth/kakao/callback");
        params.add("code", code);
        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);
        // Http요청하기 - Post 방식으로 - 그리고 response 변수의 응답받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // GSON, Json Simple, Objectmapper 라이브러리들이 있다.
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokens kakaoTokens = null;
        try {
            kakaoTokens = objectMapper.readValue(response.getBody(), KakaoTokens.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(kakaoTokens.getAccessToken());
        return response.getBody();
    }
}