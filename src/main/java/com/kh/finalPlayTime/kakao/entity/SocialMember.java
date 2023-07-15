package com.kh.finalPlayTime.kakao.entity;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.kakao.constant.SocialOAuth;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class SocialMember {
    @Id
    @Column
    private Long id;
    @Column
    private String email;
    @Column
    private String nickname;
    @Column(name = "o_auth")
    @Enumerated(EnumType.STRING)
    private SocialOAuth socialOauth;
    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public SocialMember(Long id, String email, String nickname, SocialOAuth socialOauth, Authority authority) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.socialOauth = socialOauth;
        this.authority = authority;
    }
}
