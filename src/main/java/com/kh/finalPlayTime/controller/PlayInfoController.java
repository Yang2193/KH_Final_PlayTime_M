package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.*;
import com.kh.finalPlayTime.entity.PlayLike;
import com.kh.finalPlayTime.entity.Reserve;
import com.kh.finalPlayTime.entity.SeatNumbers;
import com.kh.finalPlayTime.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value="/play")
public class PlayInfoController {
    private final PlayInfoApiService apiService;
    private final PlayDetailInfoApiService detailApiService;
    private final TheaterApiService theaterApiService;
    private final PlayLikeService playLikeService;
    private final ReserveService reserveService;


    //선택한 연극 상세정보 찾기
    @GetMapping("/{mt20id}")
    public List<PlayDetailInfoDto> getPlayDetail(@PathVariable String mt20id){
        String result = detailApiService.playDetailInfoApi(mt20id);
        return detailApiService.detailFromJsonObj(result);
    }

    // 연극 목록 DB에 저장하는 컨트롤러 부분 , 나중에 자바에서 일정시간마다 자동실행되게 할 것.
    @GetMapping("/saveList")
    public ResponseEntity<Boolean> saveList(){
        boolean isSuccess = false;
        String result = apiService.playListApi();
        isSuccess = apiService.listFromJsonObj(result);
        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
    }

    // 선택한 연극의 극장 상세 정보 불러오기
    @GetMapping("/theater/{mt10id}")
    public List<TheaterDto> getTheaterDetail(@PathVariable String mt10id) {
        String result = theaterApiService.TheaterDetailApi(mt10id);

        return theaterApiService.detailFromJsonObj(result);
    }
    // 찜목록 엔티티로 불러오기
    @GetMapping("playLikeList")
    public ResponseEntity <List<PlayLike>> getPlayLikeList(String id){
        List<PlayLike> list = playLikeService.findPlayLikeList(id);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    // 찜목록 DTO로 불러오기
    @GetMapping("playLikeList2")
    public ResponseEntity<List<PlayLikeDto>> getPlayLikeList2(String id) {
        List<PlayLikeDto> playLikeDTOs = playLikeService.findPlayLikeList2(id);
        return new ResponseEntity<>(playLikeDTOs, HttpStatus.OK);
    }
    // 찜추가
    @PostMapping("/addPlayLike")
    public ResponseEntity<PlayLikeDto> addPlayLike(@RequestBody PlayLikeDto playLikeDto) {
        PlayLikeDto addedPlayLike = playLikeService.addPlayLike(playLikeDto.getUserId(), playLikeDto.getPlayId());
        return ResponseEntity.ok(addedPlayLike);
    }
    // 찜삭제
    @PostMapping("/deletePlayLike")
    public ResponseEntity<String> deletePlayLike(@RequestBody PlayLikeDto playLikeDto) {
        playLikeService.deletePlayLike(playLikeDto.getUserId(), playLikeDto.getPlayId());
        return ResponseEntity.ok("Play like deleted");
    }
    // 예매 조회 엔티티
    @GetMapping("/resList")
    public ResponseEntity <List<Reserve>> getReserve(String id){
        List<Reserve> list = reserveService.findReserveList(id);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    // 예매 내역으로 좌석 유무 조회
    @GetMapping("/reserveSeat")
    public ResponseEntity <List<Reserve>> findSeat(String id){
        List<Reserve> list = reserveService.findSeat(id);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    // 예매 추가
    @PostMapping("/addReserve")
    public ResponseEntity<ReserveDto> addReserve(@RequestBody ReserveDto reserveDto) {
        ReserveDto addRes = reserveService.addReserve(reserveDto.getUserId(), reserveDto.getPlayId(),reserveDto.getSeeDate(),reserveDto.getReserveTime(),reserveDto.getSeatInfo());
        return ResponseEntity.ok(addRes);
    }
    // 공연장 좌석 정보 조회
    @GetMapping("/selSeat")
    public ResponseEntity <List<SeatNumberDto>> getSeatInfo (String id){
        List<SeatNumberDto> seatNumbers = reserveService.getSeatNumbers(id);
        return new ResponseEntity<>(seatNumbers,HttpStatus.OK);
    }

}
