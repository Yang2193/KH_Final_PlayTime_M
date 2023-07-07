package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.dto.PlayInfoDto;
import com.kh.finalPlayTime.entity.PlayInfo;
import com.kh.finalPlayTime.repository.PlayInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PlayListService {
    private final PlayInfoRepository pir;
    //공연 종료일이 현재 날짜를 지나지 않은 목록만 출력
    public List<PlayInfoDto> getPlayList(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        String currentDate = LocalDate.now().format(formatter);

        List<PlayInfo> plays = pir.findByPeriodEndGreaterThan(currentDate);
        List<PlayInfoDto> playInfoDtoList = new ArrayList<>();
        for(PlayInfo e : plays){
            PlayInfoDto playInfoDto = new PlayInfoDto();
            playInfoDto.setPlayId(e.getPlayId());
            playInfoDto.setTitle(e.getTitle());
            playInfoDto.setImageUrl(e.getImageUrl());
            playInfoDto.setPeriodStart(e.getPeriodStart());
            playInfoDto.setPeriodEnd(e.getPeriodEnd());
            playInfoDto.setTheaterName(e.getTheaterName());
            playInfoDtoList.add(playInfoDto);
        }
        return playInfoDtoList;
    }


    //제목검색 메소드 -> AND로 수정할 지 말지 고민 중. 배우도 추가하면 OR로 쓰는 레포지토리 메소드로 바꿀 듯?
    public List<PlayInfoDto> searchPlayList(String[] keywords){
        List<PlayInfo> list = new ArrayList<>();
        for(String e : keywords){
            List<PlayInfo> playInfoList = pir.findByTitleContaining(e);
            list.addAll(playInfoList);
        }
        // 중복 결과 제거
        Set<PlayInfo> distinctList = new HashSet<>(list);
        List<PlayInfo> resultList = new ArrayList<>(distinctList);

        //Dto에 옮기기
        List<PlayInfoDto> playInfoDtoList = new ArrayList<>();
        for(PlayInfo e : resultList){
            PlayInfoDto playInfoDto = new PlayInfoDto();
            playInfoDto.setPlayId(e.getPlayId());
            playInfoDto.setTitle(e.getTitle());
            playInfoDto.setImageUrl(e.getImageUrl());
            playInfoDto.setPeriodStart(e.getPeriodStart());
            playInfoDto.setPeriodEnd(e.getPeriodEnd());
            playInfoDto.setTheaterName(e.getTheaterName());
            playInfoDtoList.add(playInfoDto);
        }
        return playInfoDtoList;
    }
}
