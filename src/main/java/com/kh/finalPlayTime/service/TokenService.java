package com.kh.finalPlayTime.service;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import com.kh.finalPlayTime.repository.RefreshTokenRepository;
import com.kh.finalPlayTime.utils.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class TokenService {
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberInfoRepository memberInfoRepository;

    public TokenDto createNewAccessToken(String refreshToken) {
        if(!tokenProvider.validateToken(refreshToken)) {
            throw new TokenExpiredException("Refresh Token이 만료되었습니다. 재발급이 필요합니다.");
        }
        //리프레쉬 토큰으로 액세스토큰을 재발급 받음 , 리프레쉬 토큰은 로그인할 때 항상 재발급 되어서 업데이트 됨.

        String userId = refreshTokenRepository.findByRefreshToken(refreshToken).get().getUserId();
        MemberInfo member = memberInfoRepository.findByUserId(userId).get();
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(member.getAuthority().toString()));
        // member를 Authentication 객체로 변환
        UserDetails userDetails = User.withUsername(String.valueOf(member.getUserId()))
                .password(member.getUserPw())
                .authorities(authorities)
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", authorities);

        return tokenProvider.generateAccessTokenDto(authentication);
    }
}