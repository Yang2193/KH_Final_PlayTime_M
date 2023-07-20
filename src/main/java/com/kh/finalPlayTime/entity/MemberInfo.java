package com.kh.finalPlayTime.entity;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.kakao.constant.SocialOAuth;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberInfo {
    @Id
    @Column(unique = true, length = 20, nullable = false)
    private String userId;
    @Column(name = "password", length = 500) // 패스워드 암호화해서 길어지므로, 길이 늘림.
    private String userPw;
    @Column(length = 12)
    private String userName;
    @Column(length = 30)
    private String userNickname;
    @Column(length = 50)
    private String userEmail;
    @Column(length = 30)
    private String userPhone;
    @Column
    private LocalDateTime joinDate;
    @Enumerated(EnumType.STRING)
    private Withdraw withdraw;
    @Enumerated(EnumType.STRING)
    private Authority authority; // USER인지 ADMIN인지 구분하기 위해 부여.
    @Enumerated(EnumType.STRING)
    private SocialOAuth socialOAuth;
    @Column
    private String imgUrl;
    //빌더
    @Builder
    public MemberInfo(String userId, String userPw, String userName, String userNickname, String userEmail, String userPhone, LocalDateTime joinDate, Withdraw withdraw, Authority authority, SocialOAuth socialOAuth, String imgUrl) {
        this.userId = userId;
        this.userPw = userPw;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.joinDate = joinDate;
        this.withdraw = withdraw;
        this.authority = authority;
        this.socialOAuth = socialOAuth;
        this.imgUrl = imgUrl;
    }
}
