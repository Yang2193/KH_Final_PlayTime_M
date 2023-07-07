package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController { // 마이페이지 전용 컨트롤러로 활용.
    @Autowired
    private MemberService memberService;
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }


    @PostMapping("/userinfo")
    public ResponseEntity<MemberDto> getUserInfo(@RequestBody Map<String, String> getUserData) {
        String userId = getUserData.get("userId");
        MemberDto memberDto = memberService.getMemberInfo(userId);
        System.out.println(userId);
        if(memberDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(memberDto);
    }

}
