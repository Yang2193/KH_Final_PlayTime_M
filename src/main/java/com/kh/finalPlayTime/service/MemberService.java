package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.dto.MemberDto;
import com.kh.finalPlayTime.dto.TokenDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
@Slf4j
public class MemberService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberInfoRepository memberInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberDto getMemberInfo(String userId) {
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserId(userId);
        MemberDto memberDto = new MemberDto();
        if (optionalMemberInfo.isPresent()) {
            MemberInfo memberInfo = optionalMemberInfo.get();
            memberDto.setUserId(memberInfo.getUserId());
            memberDto.setUserPw(memberInfo.getUserPw());
            memberDto.setUserName(memberInfo.getUserName());
            memberDto.setUserNickname(memberInfo.getUserNickname());
            memberDto.setUserPhone(memberInfo.getUserPhone());
            memberDto.setJoinDate(memberInfo.getJoinDate());
            memberDto.setUserEmail(memberInfo.getUserEmail());
            memberDto.setMessage("조회 성공");
        } else {
            memberDto.setMessage("아이디가 존재하지 않습니다.");
        }
        return memberDto;
    }

    public List<MemberDto> getMemberInfoList(String userId) {
        List<MemberDto> list = new ArrayList<>();
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserId(userId);
        MemberDto memberDto = new MemberDto();
        if (optionalMemberInfo.isPresent()) {
            MemberInfo memberInfo = optionalMemberInfo.get();
            memberDto.setUserId(memberInfo.getUserId());
            memberDto.setUserPw(memberInfo.getUserPw());
            memberDto.setUserName(memberInfo.getUserName());
            memberDto.setUserNickname(memberInfo.getUserNickname());
            memberDto.setUserPhone(memberInfo.getUserPhone());
            memberDto.setJoinDate(memberInfo.getJoinDate());
            memberDto.setUserEmail(memberInfo.getUserEmail());
            list.add(memberDto);
            memberDto.setMessage("조회 성공");
        } else {
            memberDto.setMessage("아이디가 존재하지 않습니다.");
        }
        return list;
    }

    public List<MemberInfo> checkMemberPw(String userId, String userPw) {
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserId(userId);
        List<MemberInfo> matchingMembers = new ArrayList<>();
        if (optionalMemberInfo.isPresent()) {
            MemberInfo memberInfo = optionalMemberInfo.get();
            if (passwordEncoder.matches(userPw, memberInfo.getUserPw())) {
                matchingMembers.add(memberInfo);
            }
        }
        return matchingMembers;
    }

    public boolean updateMemberInfo(String userId, String userPw, String userNickname, String userName, String userPhone, String userEmail) {
        System.out.println(userId + userPw + userNickname + userName + userPhone + userEmail);
        return memberInfoRepository.findByUserId(userId)
                .map(member -> {
                    member.setUserPw(passwordEncoder.encode(userPw));
                    member.setUserNickname(userNickname);
                    member.setUserName(userName);
                    member.setUserPhone(userPhone);
                    member.setUserEmail(userEmail);
                    MemberInfo saveMember = memberInfoRepository.save(member);
                    log.info(saveMember.toString());
                    return true;
                })
                .orElseThrow(() -> new RuntimeException("해당 userId를 가진 멤버를 찾을 수 없습니다."));
    }
}
