package com.kh.finalPlayTime.dto;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.entity.MemberInfo;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
    private String userId;
    private String userPw;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String userNickname;
    private LocalDateTime joinDate;
    private String message;

    public MemberInfo toMember(PasswordEncoder passwordEncoder) {
        return MemberInfo.builder()
                .userId(userId)
                .userPw(passwordEncoder.encode(userPw))
                .userName(userName)
                .userNickname(userNickname)
                .userEmail(userEmail)
                .userPhone(userPhone)
                .authority(Authority.ROLE_USER)
                .joinDate(LocalDateTime.now())
                .withdraw(Withdraw.Y)
                .build();
    }


    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userId, userPw);
    }
    public static MemberDto of(MemberInfo member) {
        return MemberDto.builder()
                .message(member.getUserId() + "님의 회원가입을 환영합니다.")
                .build();
    }
}
