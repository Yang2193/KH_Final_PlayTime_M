package com.kh.finalPlayTime.kakao.dto;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;

public class TotalDto {
    private MemberDto memberDto;
    private TokenDto tokenDto;

    public TotalDto(MemberDto memberDto, TokenDto tokenDto) {
        this.memberDto = memberDto;
        this.tokenDto = tokenDto;
    }
    public MemberDto getKakaoProfile() {
        return memberDto;
    }
    public TokenDto getTokenDto() {
        return tokenDto;
    }
}
