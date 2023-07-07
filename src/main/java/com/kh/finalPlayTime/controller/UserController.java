package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final MemberService memberService;

    public UserController(MemberService memberService) {
        this.memberService = memberService;
    }
    @GetMapping
    public ResponseEntity<List<MemberDto>> getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();
        List<MemberDto> list = memberService.getMemberInfoList(userId);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
