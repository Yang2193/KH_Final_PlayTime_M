package com.kh.finalPlayTime.kakao.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.finalPlayTime.kakao.constant.OAuth;
import com.kh.finalPlayTime.kakao.dto.KakakoProfile;
import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import com.kh.finalPlayTime.kakao.jwt.AuthTokens;
import com.kh.finalPlayTime.kakao.params.KakaoLoginParams;
import com.kh.finalPlayTime.kakao.service.OAuthLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Transactional
public class KakaoController {
    private final OAuthLoginService oAuthLoginService;

    @GetMapping("/kakao/callback")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }
//    @GetMapping("/kakao/callback")
//    public @ResponseBody String kakaoCallback(String code) {
//        RestTemplate rt = new RestTemplate();
//
//        // HttpHeader 오브젝트 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // HttpBody 오브젝트 생성
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", "088a7b267c39d0a11ec3904372ed9d33");
//        params.add("redirect_uri", "http://localhost:8111/auth/kakao/callback");
//        params.add("code", code);
//
//        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
//        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
//                new HttpEntity<>(params, headers);
//
//        // Http요청하기 - Post 방식으로 - 그리고 response 변수의 응답받음.
//        ResponseEntity<String> response = rt.exchange(
//                "https://kauth.kakao.com/oauth/token",
//                HttpMethod.POST,
//                kakaoTokenRequest,
//                String.class
//        );
//
//        // GSON, Json Simple, Objectmapper 라이브러리들이 있다.
//        ObjectMapper objectMapper = new ObjectMapper();
//        KakaoTokens kakaoTokens = null;
//        try {
//            kakaoTokens = objectMapper.readValue(response.getBody(), KakaoTokens.class);
//        } catch (JsonMappingException e) {
//            e.printStackTrace();
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        System.out.println("카카오 엑세스 토큰 : " + kakaoTokens.getAccessToken());
//
//        RestTemplate rt2 = new RestTemplate();
//
//        // HttpHeader 오브젝트 생성
//        HttpHeaders headers2 = new HttpHeaders();
//        headers2.add("Authorization", "Bearer " + kakaoTokens.getAccessToken());
//        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
//        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
//                new HttpEntity<>(headers2);
//
//        // Http요청하기 - Post 방식으로 - 그리고 response 변수의 응답받음.
//        ResponseEntity<String> response2 = rt2.exchange(
//                "https://kapi.kakao.com/v2/user/me",
//                HttpMethod.POST,
//                kakaoProfileRequest,
//                String.class
//        );
//
//        ObjectMapper objectMapper2 = new ObjectMapper();
//        KakakoProfile kakakoProfile = null;
//        try {
//            kakakoProfile = objectMapper2.readValue(response2.getBody(), KakakoProfile.class);
//        } catch (JsonMappingException e) {
//            e.printStackTrace();
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        // USER
//        System.out.println("카카오 아이디(번호) : " + kakakoProfile.getId());
//        System.out.println("카카오 이메일 : " + kakakoProfile.getKakao_account().getEmail());
//
//        System.out.println("블로그서버 아이디: " + kakakoProfile.getKakao_account().getEmail()+"_"+kakakoProfile.getId());
//        System.out.println("블로그서버 이메일: " + kakakoProfile.getKakao_account().getEmail());
//        UUID onetimePassword = UUID.randomUUID();
//        System.out.println("블로그서버 패스워드: " + onetimePassword);
//
//        oAuthLoginService.login();
//        return response2.getBody();
//    }
}