package com.kh.finalPlayTime.kakao.service;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import com.kh.finalPlayTime.service.EmailService;
import com.kh.finalPlayTime.utils.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class KAuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberInfoRepository memberInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final EmailService emailService;
    @Value("${cos.key}")
    private String cosKey;
    public TokenDto login(MemberDto memberDto){
        if (memberDto.getId() != null) {
            memberDto.setUserId(String.valueOf(memberDto.getId()));
        }
        UsernamePasswordAuthenticationToken authenticationToken = memberDto.toAuthentication2(cosKey);
        MemberInfo loginMember = memberInfoRepository.findByUserId(String.valueOf(memberDto.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 회원가입 진행 후 다시 시도해주세요."));

        // 비밀번호 맞는지 확인
        System.out.println(loginMember.getUserPw());
        if (!passwordEncoder.matches(cosKey, loginMember.getUserPw())) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }
        System.out.println("비밀번호 체크 통과.");
        if (loginMember.getWithdraw().equals(Withdraw.N)) {
            throw new IllegalArgumentException("해당 사용자는 탈퇴한 상태입니다.");
        }
        System.out.println("탈퇴여부 체크 통과.");

        // 권한 확인
        if (loginMember.getAuthority().equals(Authority.ROLE_USER)) {
            System.out.println("권한 체크 진입.");
            try {
                System.out.println("1111111111111");
                Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
                TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
                System.out.println("토큰 발급" + tokenDto);
                return tokenDto;
            } catch (AuthenticationException e) {
                throw e;
            }
        } else {
            throw new IllegalArgumentException("권한이 올바르지 않습니다.");
        }
    }

    //토큰 검증 및 사용자 정보 추출
    public MemberInfo validateTokenAndGetUser(HttpServletRequest request, UserDetails userDetails) {
        //토큰 추출
        String accessToken = request.getHeader("Authorization");
        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);
        }
        // 🔑토큰 유효한지 검증
//        if (accessToken != null && tokenProvider.validateToken(accessToken)) {
        if (accessToken != null && tokenProvider.validateToken(accessToken)) {
            String userId = userDetails.getUsername();
            MemberInfo member = memberInfoRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
            return member;
        } else {
            throw new TokenExpiredException("토큰이 만료됐습니다. Refresh Token 재발급이 필요합니다.");
        }
    }
}
