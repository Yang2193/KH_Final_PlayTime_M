package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.dto.ReserveDto;
import com.kh.finalPlayTime.dto.SeatDto;
import com.kh.finalPlayTime.dto.SeatNumberDto;
import com.kh.finalPlayTime.entity.*;
import com.kh.finalPlayTime.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Transactional
@Service
@RequiredArgsConstructor
public class ReserveService {
    private final ReserveRepository reserveRepository;
    private final PlayInfoRepository playInfoRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final SeatRepository seatRepository;
    private final SeatNumbersRepository seatNumbersRepository;
    // 회원 예매 내역 엔티티로 조회
    public List<Reserve> findReserveList (String userId) {
        return reserveRepository.findByMemberInfoUserId(userId);
    }
    // 예매내역 토대로 좌석 유무 조회
    public List<Reserve> findSeat (String playId) {
        return reserveRepository.findByPlayInfoPlayId(playId);
    }
    // 예매 등록
    public ReserveDto addReserve(String userId,String playId,String seeDate,String time,String seatInfo){
        Reserve reserve = new Reserve();
        // 회원 정보 설정
        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByUserId(userId);
        if (memberInfoOptional.isEmpty()) {
            throw new IllegalArgumentException("Member not found");
        }
        MemberInfo memberInfo = memberInfoOptional.get();
        reserve.setMemberInfo(memberInfo);

        // 플레이 정보 설정
        Optional<PlayInfo> playInfoOptional = playInfoRepository.findByPlayId(playId);
        if (playInfoOptional.isEmpty()) {
            throw new IllegalArgumentException("Play not found");
        }
        PlayInfo playInfo = playInfoOptional.get();
        reserve.setPlayInfo(playInfo);
        reserve.setReserveDate(LocalDateTime.now());
        reserve.setSeeDate(seeDate);
        reserve.setTime(time);
        reserve.setSeatInfo(seatInfo);
        reserveRepository.save(reserve);

        ReserveDto reserveDto =new ReserveDto();
        reserveDto.setReserveDate(reserve.getReserveDate());
        reserveDto.setReserveId(reserve.getId());
        reserveDto.setUserId(reserve.getMemberInfo().getUserId());
        reserveDto.setPlayId(reserve.getPlayInfo().getPlayId());
        reserveDto.setSeeDate(reserve.getSeeDate());
        reserveDto.setSeatInfo(reserve.getSeatInfo());
        reserveDto.setReserveTime(reserve.getTime());
        return reserveDto;
    }
    // 공연장 좌석정보 불러오기
    public List<SeatNumberDto> getSeatNumbers(String theaterId) {
        List<SeatNumbers> seatNumbersList = seatNumbersRepository.findBySeatTheaterTheaterId(theaterId);

        List<SeatNumberDto> seatNumberDtoList = new ArrayList<>();
        for (SeatNumbers seatNumbers : seatNumbersList) {
            SeatNumberDto seatNumberDto = new SeatNumberDto();
            seatNumberDto.setSeatNumId(seatNumbers.getId());
            seatNumberDto.setSeatNumber(seatNumbers.getSeatNumber());
            seatNumberDto.setSeatId(seatNumbers.getSeat().getSeatId());
            seatNumberDtoList.add(seatNumberDto);
        }
        return seatNumberDtoList;
    }


}

