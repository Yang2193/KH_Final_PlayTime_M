package com.kh.finalPlayTime.dto;

import com.kh.finalPlayTime.kakao.dto.KakaoProfile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long tokenExpiresIn;
    private String authority;
    private KakaoProfile kakaoProfile;

    public TokenDto(String renewAccessToken){
        accessToken = renewAccessToken;
    }

    @Override
    public String toString() {
        return "TokenDto{" +
                "grantType='" + grantType + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                ", tokenExpiresIn=" + tokenExpiresIn +
                ", authority='" + authority + '\'' +
                ", kakaoProfile=" + kakaoProfile +
                '}';
    }
}
