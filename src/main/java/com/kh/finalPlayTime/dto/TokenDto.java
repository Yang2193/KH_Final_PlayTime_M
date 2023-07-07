package com.kh.finalPlayTime.dto;

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

    public TokenDto(String renewAccessToken){
        accessToken = renewAccessToken;
    }

}
