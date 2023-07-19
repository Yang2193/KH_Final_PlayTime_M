package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.service.AuthService;
import com.kh.finalPlayTime.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController { // 로그인 회원가입 ID/PW 찾기 여기에서
    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/signup")
    public ResponseEntity<MemberDto> signup(@RequestBody MemberDto memberDto){
        return ResponseEntity.ok(authService.signup(memberDto));
    }

    @PostMapping("/login") // 로그인시 ID, PW 일치 시 TRUE와 토큰을 함께 반환
    public ResponseEntity<TokenDto> getToken(@RequestBody MemberDto memberDto) {
        TokenDto tokenDto = authService.login(memberDto);
        return ResponseEntity.ok(tokenDto);
    }

    @PostMapping("/find/id")
    public ResponseEntity<String> findMemberId(@RequestBody Map<String, String> findIdData) {
        String userName = findIdData.get("userName");
        String userEmail = findIdData.get("userEmail");
        String memberDto = authService.findId(userName, userEmail);
        if (memberDto == null) {
            // 아이디를 찾지 못한 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 아이디를 찾은 경우
        return ResponseEntity.ok(memberDto);
    }

    @PostMapping("/find/pw")
    public ResponseEntity<Boolean> findMemberPw(@RequestBody Map<String, String> findPwData) throws Exception {
        String userId = findPwData.get("userId");
        String userName = findPwData.get("userName");
        String userEmail = findPwData.get("userEmail");
        return ResponseEntity.ok(authService.findPw(userId, userName, userEmail));
    }

    // AccessToken 재발급 코드
    @PostMapping("/token")
    public ResponseEntity<TokenDto> renewAccessToken(@RequestBody TokenDto requestDto){
        TokenDto renewDto = tokenService.createNewAccessToken(requestDto.getRefreshToken());
        return ResponseEntity.ok(renewDto);
    }

    // 회원가입 및 마이페이지정보수정 시 인증코드 발송
    @PostMapping("/sendAuthEmail")
    public ResponseEntity<String> sendAuthEmail(@RequestBody Map<String, String> sendData) throws Exception {
        String userEmail = sendData.get("userEmail");
        return ResponseEntity.ok(authService.sendEmail(userEmail));
    }
}
