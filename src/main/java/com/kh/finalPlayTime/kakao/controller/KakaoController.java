package com.kh.finalPlayTime.kakao.controller;

import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.kakao.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Transactional
public class KakaoController {
    private final KakaoAuthService kakaoAuthService;

    @GetMapping(value = "/kakao/callback", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDto> kakaoCallback(@RequestParam("code") String code) {
        TokenDto tokenDto = kakaoAuthService.processKakaoCallback(code);
        return ResponseEntity.ok(tokenDto);
    }
}