package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.dto.PlayLikeDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.entity.PlayInfo;
import com.kh.finalPlayTime.entity.PlayLike;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import com.kh.finalPlayTime.repository.PlayInfoRepository;
import com.kh.finalPlayTime.repository.PlayLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Transactional
@Service
@RequiredArgsConstructor
public class PlayLikeService {
    private final PlayLikeRepository playLikeRepository;
    private final PlayInfoRepository playInfoRepository;
    private final MemberInfoRepository memberInfoRepository;

// 엔티티로 조회 (회원정보 연극정보의 모든 컬럼이 객체로 조회됨)
    public List<PlayLike> findPlayLikeList (String userId) {
        return playLikeRepository.findByMemberInfoUserId(userId);
    }

// 디티오로 조회(원하는 dto 컬럼들만 조회됨)
    public List<PlayLikeDto> findPlayLikeList2(String userId) {
        List<PlayLike> playLikes = playLikeRepository.findByMemberInfoUserId(userId);
        List<PlayLikeDto> playLikeDTOs = new ArrayList<>();

        for (PlayLike playLike : playLikes) {
            PlayLikeDto playLikeDTO = new PlayLikeDto();
            playLikeDTO.setPlayLikeId(playLike.getId());
            playLikeDTO.setUserId(playLike.getMemberInfo().getUserId());
            playLikeDTO.setPlayId(playLike.getPlayInfo().getPlayId());
            playLikeDTOs.add(playLikeDTO);
        }
        return playLikeDTOs;
    }
    // 찜등록

    public PlayLikeDto addPlayLike(String userId, String playId) {
        PlayLike playLike = new PlayLike();

        // 회원 정보 설정
        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByUserId(userId);
        if (memberInfoOptional.isEmpty()) {
            throw new IllegalArgumentException("Member not found");
        }
        MemberInfo memberInfo = memberInfoOptional.get();
        playLike.setMemberInfo(memberInfo);

        // 플레이 정보 설정
        Optional<PlayInfo> playInfoOptional = playInfoRepository.findByPlayId(playId);
        if (playInfoOptional.isEmpty()) {
            throw new IllegalArgumentException("Play not found");
        }
        PlayInfo playInfo = playInfoOptional.get();
        playLike.setPlayInfo(playInfo);

        playLikeRepository.save(playLike);

        // PlayLikeDto 생성 및 반환
        PlayLikeDto playLikeDto = new PlayLikeDto();
        playLikeDto.setPlayLikeId(playLike.getId());
        playLikeDto.setUserId(playLike.getMemberInfo().getUserId());
        playLikeDto.setPlayId(playLike.getPlayInfo().getPlayId());
        return playLikeDto;
    }

    public void deletePlayLike(String userId, String playId) {
        // 찜 정보 조회
        PlayLike playLike = playLikeRepository.findByMemberInfoUserIdAndPlayInfoPlayId(userId, playId);
        if (playLike == null) {
            throw new IllegalArgumentException("Play like not found");
        }

        // 찜 정보 삭제
        playLikeRepository.delete(playLike);
    }

}