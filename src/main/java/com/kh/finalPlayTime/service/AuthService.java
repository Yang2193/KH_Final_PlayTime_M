package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import com.kh.finalPlayTime.utils.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberInfoRepository memberInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final EmailService emailService;

    public MemberDto signup(MemberDto memberDto){
        if(memberInfoRepository.existsByUserId(memberDto.getUserId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        MemberInfo memberInfo = memberDto.toMember(passwordEncoder);
        return MemberDto.of(memberInfoRepository.save(memberInfo));
    }

    public TokenDto login(MemberDto memberDto){
        UsernamePasswordAuthenticationToken authenticationToken = memberDto.toAuthentication();

        MemberInfo loginMember = memberInfoRepository.findByUserId(memberDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 회원가입 진행 후 다시 시도해주세요."));

        // 비밀번호 맞는지 확인
        if (!passwordEncoder.matches(memberDto.getUserPw(), loginMember.getUserPw())) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }

        if (loginMember.getWithdraw().equals(Withdraw.N)) {
            throw new IllegalArgumentException("해당 사용자는 탈퇴한 상태입니다.");
        }

        // 권한 확인
        if (loginMember.getAuthority().equals(Authority.ROLE_ADMIN)) {
            try {
                Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
                TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
//                tokenDto.setAuthority(String.valueOf(Authority.ROLE_ADMIN));
                return tokenDto;
            } catch (AuthenticationException e) {
                throw e;
            }
        } else if (loginMember.getAuthority().equals(Authority.ROLE_USER)) {
            try {
                Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
                TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
//                tokenDto.setAuthority(String.valueOf(Authority.ROLE_USER));
                return tokenDto;
            } catch (AuthenticationException e) {
                throw e;
            }
        } else {
            throw new IllegalArgumentException("권한이 올바르지 않습니다.");
        }
    }

    //토큰 검증 및 사용자 정보 추출
    public MemberInfo validateTokenAndGetUser(HttpServletRequest request, UserDetails userDetails){
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
    // 아이디 찾기
    public String findId(String userName, String userEmail) {
        MemberInfo member = memberInfoRepository.findByUserNameAndUserEmail(userName, userEmail);
        System.out.println("서비스 : " +userName + " " + userEmail + " " + member);
        if (member == null) {
            System.out.println("아이디를 찾지 못함");
            return null; // 아이디를 찾지 못한 경우 null을 반환하거나 원하는 대응을 수행
        }
        MemberDto memberDto = new MemberDto();
        memberDto.setUserId(member.getUserId());
        System.out.println("서비스 ID 찾기 :" + memberDto.getUserId());
        String result = member.getUserId();
        return result;
    }

    // 회원가입 시 인증메일 발송
    public String sendEmail(String userEmail) throws Exception {
        String authCode = emailService.sendAuthMailKey(userEmail);
        return authCode;
    }

    // 프로필 수정 시 인증메일 발송
    public String AuthEmail(String userEmail) throws Exception {
        String authCode = emailService.mypageEmailAuthKey(userEmail);
        return authCode;
    }

    // 패스워드 찾기
    public boolean findPw(String userId, String userName, String userEmail) throws Exception{
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserIdAndUserNameAndUserEmail(userId, userName, userEmail);
        MemberDto memberDto = new MemberDto();
        if(optionalMemberInfo.isPresent()) {
            updatePasswordWithAuthKey(userId, userEmail);
            return true;
        }
        System.out.println("Auth서비스 : 데이터 없음.");
        return false;
    }

    // 패스워드 찾기 시 회원 이메일로 임시 패스워드 발송 및 db에 임시 패스워드 저장
    public void updatePasswordWithAuthKey(String userId, String userEmail) throws Exception {
        String ePw = emailService.sendPasswordAuthKey(userEmail);
        MemberInfo memberInfo = memberInfoRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
        String encodePassword = passwordEncoder.encode(ePw);
        memberInfo.setUserPw(encodePassword);
        memberInfoRepository.save(memberInfo);
    }

    // 회원탈퇴

    public boolean withdrawal(String userId) {
        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByUserId(userId);
        if (memberInfoOptional.isPresent()) {
            MemberInfo memberInfo = memberInfoOptional.get();
            memberInfo.setWithdraw(Withdraw.N);
            memberInfoRepository.save(memberInfo);
            return true;
        }
        return false;
    }
}
