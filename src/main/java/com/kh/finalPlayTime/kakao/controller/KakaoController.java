package com.kh.finalPlayTime.kakao.controller;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.kakao.dto.KakaoTokens;
import com.kh.finalPlayTime.kakao.dto.TotalDto;
import com.kh.finalPlayTime.kakao.service.KAuthService;
import com.kh.finalPlayTime.kakao.service.KakaoProfileService;
import com.kh.finalPlayTime.kakao.service.OAuthTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Transactional
@Slf4j
public class KakaoController {
    private final OAuthTokenService oAuthTokenService;
    private final KakaoProfileService kakaoProfileService;
    private final KAuthService kAuthService;

    @PostMapping(value = "/kakao/callback")
    public TotalDto kakaoCallback(@RequestBody Map<String, String> tokenData) {
        String code = tokenData.get("code");
        KakaoTokens kakaoTokens = oAuthTokenService.getKakaoTokens(code);
        MemberDto memberDto = kakaoProfileService.getKakaoProfile(kakaoTokens.getAccessToken());
        System.out.println(memberDto.getUserId());
        TokenDto tokenDto = kAuthService.login(memberDto);//토큰 관련 메소드
        return new TotalDto(memberDto, tokenDto, kakaoTokens); //반환값으로 카카오사용자 정보 + JWT 액세스, 리프레쉬를 넘김
    }
    @PostMapping(value = "/kakao/logout")
    public Boolean kakaologout(@RequestBody Map<String, String> accesstoken) {
        System.out.println("로그아웃 컨트롤러 진입");
        String token = accesstoken.get("token");
        return oAuthTokenService.logout(token);
    }
//    @GetMapping(value = "/kakao/callback")
//    public ResponseEntity<TokenDto> kakaoCallback(@RequestParam("code") String code) {
//        TokenDto tokenDto = kakaoAuthService.processKakaoCallback(code);
//        System.out.println(tokenDto);
//        return ResponseEntity.ok(tokenDto);
//    }
}