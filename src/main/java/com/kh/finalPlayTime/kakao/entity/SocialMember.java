package com.kh.finalPlayTime.kakao.entity;

import com.kh.finalPlayTime.kakao.constant.OAuth;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SocialMember {
    @Id
    private Long id;
    @Column
    private String email;
    @Column
    private String nickname;
    @Enumerated(EnumType.STRING)
    private OAuth oAuth;

    @Builder
    public SocialMember(String email, String nickname, OAuth oAuth) {
        this.email = email;
        this.nickname = nickname;
        this.oAuth = oAuth;
    }

}
