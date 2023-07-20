package com.kh.finalPlayTime.kakao.dto;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;

public class TotalDto {
    private MemberDto memberDto;
    private TokenDto tokenDto;
    private KakaoTokens kakaoTokens;

    public TotalDto(MemberDto memberDto, TokenDto tokenDto, KakaoTokens kakaoTokens) {
        this.memberDto = memberDto;
        this.tokenDto = tokenDto;
        this.kakaoTokens = kakaoTokens;
    }
    public MemberDto getKakaoProfile() {
        return memberDto;
    }
    public TokenDto getTokenDto() {
        return tokenDto;
    }
    public KakaoTokens getKakaoTokens() {return kakaoTokens;}
}
