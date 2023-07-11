package com.kh.finalPlayTime.kakao.entity;

import com.kh.finalPlayTime.kakao.constant.OAuth;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
public class SocialMember {
    @Id
    private Long id;
    private String email;
    private String nickname;
    private OAuth oAuth;

    @Builder
    public SocialMember(String email, String nickname, OAuth oAuth) {
        this.email = email;
        this.nickname = nickname;
        this.oAuth = oAuth;
    }

}
