package com.kh.finalPlayTime.kakao.entity;

import com.kh.finalPlayTime.kakao.constant.OAuth;
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
    @Column
    @Enumerated(EnumType.STRING)
    private OAuth oAuth;

    @Builder
    public SocialMember(Long id, String email, String nickname, OAuth oAuth) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.oAuth = oAuth;
    }
}
