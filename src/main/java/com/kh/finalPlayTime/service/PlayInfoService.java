package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.entity.PlayInfo;
import com.kh.finalPlayTime.repository.PlayInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class PlayInfoService {
    private final PlayInfoRepository playInfoRepository;

    public Optional<PlayInfo> findInfo (String id) {
//        List<PlayInfo> playInfoList = playInfoRepository.findByPlayId(id);
//        List<PlayInfoDto> playInfoDtos = new ArrayList<>();
//        for (PlayInfo play : playInfoList) {
//            PlayInfoDto playInfoDto = new PlayInfoDto();
//            playInfoDto.setPlayId(play.getPlayId());
//            playInfoDto.set(play.getPlayId());
//        }
        return playInfoRepository.findByPlayId(id);
    }
}
