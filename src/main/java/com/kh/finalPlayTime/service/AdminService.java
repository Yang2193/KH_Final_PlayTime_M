package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.constant.Authority;
import com.kh.finalPlayTime.constant.ReportStatus;
import com.kh.finalPlayTime.constant.Withdraw;
import com.kh.finalPlayTime.dto.*;
import com.kh.finalPlayTime.entity.*;
import com.kh.finalPlayTime.jwt.TokenProvider;
import com.kh.finalPlayTime.repository.*;
import com.kh.finalPlayTime.utils.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AdminService { // Admin에서만 필요한 Service는 AdminService에서 관리 그 외의 것은 가져오기.
    private final MemberInfoRepository memberInfoRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final TheaterRepository theaterRepository;
    private final PostService postService;
    private final PlayInfoRepository playInfoRepository;
    private final SeatRepository seatRepository;
    private final SeatNumbersRepository seatNumbersRepository;
    private final EntityManager entityManager;
    private final ReportRepository reportRepository;

    // 전체 회원 조회
    public List<MemberDto> getMemberList() {
        List<MemberDto> memberDtoList = new ArrayList<>();
        List<MemberInfo> memberInfoList = memberInfoRepository.findAll();
        for(MemberInfo info : memberInfoList) {
            MemberDto memberDto = new MemberDto();
            memberDto.setUserId(info.getUserId());
            memberDto.setUserName(info.getUserName());
            memberDto.setUserPhone(info.getUserPhone());
            memberDto.setUserEmail(info.getUserEmail());
            memberDtoList.add(memberDto);
        }
        return memberDtoList;
    }

    // 특정 멤버 상세 정보 조회
    public MemberDto getMember(String userId) {
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserId(userId);
        MemberDto memberDto = new MemberDto();
        if(optionalMemberInfo.isPresent()) {
            MemberInfo memberInfo = optionalMemberInfo.get();
            memberDto.setUserId(memberInfo.getUserId());
            memberDto.setUserPw(memberInfo.getUserPw());
            memberDto.setUserName(memberInfo.getUserName());
            memberDto.setUserPhone(memberInfo.getUserPhone());
            memberDto.setUserEmail(memberInfo.getUserEmail());
            if(memberInfo.getWithdraw() == Withdraw.N) memberDto.setMessage("BLOCK");
            else memberDto.setMessage("NOT BLOCK");

        } else{
            memberDto.setMessage("멤버가 없습니다.");
        }
        return memberDto;
    }
    //특정 멤버 차단 / 차단해제
    public void blockMember(String userId){
        Optional<MemberInfo> optionalMemberInfo = memberInfoRepository.findByUserId(userId);
        if(optionalMemberInfo.isPresent()){
            MemberInfo memberInfo = optionalMemberInfo.get();
            if(memberInfo.getWithdraw() == Withdraw.Y) memberInfo.setWithdraw(Withdraw.N);
            else memberInfo.setWithdraw(Withdraw.Y);
            memberInfoRepository.save(memberInfo);
        }
    }

    //공연 관련
    //전체 공연 목록 출력
    public List<PlayInfoDto> getPlayListAll(){
        List<PlayInfo> plays = playInfoRepository.findAll();
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

    // 연극 삭제

    public void deletePlay(String playId){
        playInfoRepository.deleteByPlayId(playId);
    }
    //극장관리 컨트롤러 부분
    //극장 목록 불러오기
    public List<TheaterDto> getTheaterListAll(){
        List<Theater> theaters = theaterRepository.findAll();
        List<TheaterDto> theaterDtoList = new ArrayList<>();
        for(Theater e : theaters){
            TheaterDto dto = new TheaterDto();
            dto.setTheaterId(e.getTheaterId());
            dto.setTheaterName(e.getTheaterName());
            dto.setTheaterAddr(e.getTheaterAddr());
            dto.setTheaterCall(e.getTheaterCall());
            dto.setTheaterWeb(e.getTheaterWeb());
            dto.setTheaterSeats(e.getTheaterSeats());
            theaterDtoList.add(dto);
        }
        return theaterDtoList;
    }

    //극장 좌석 불러오기
    public SeatDto getSeat(String theaterId, String theaterName){
        SeatDto seatDto = new SeatDto();
        seatDto.setTheaterId(theaterId);
        seatDto.setTheaterName(theaterName);

        Optional<Seat> seatOptional = seatRepository.findByTheaterTheaterId(theaterId);

        if(seatOptional.isPresent()){
            Seat seat = seatOptional.get();
            seatDto.setSeatId(seat.getSeatId());

            List<SeatNumbers> seatNumbersList = seatNumbersRepository.findBySeatSeatId(seat.getSeatId());
            seatDto.setSeatNumbers(seatNumbersList);
            seatDto.convertSeatNumbersToMap();
        }
        return seatDto;
    }


    public void createSeat(Map<String, String> seatInfo) {

        Long seatId = Long.valueOf(seatInfo.get("seatId"));
        String theaterId = seatInfo.get("theaterId");
        String theaterName = seatInfo.get("theaterName");



        Seat seat = new Seat();
        seat.setSeatId(seatId);

        //theater Id 설정
        Theater theater = new Theater();
        theater.setTheaterId(theaterId);
        seat.setTheater(theater);

        Map<String, Integer> seatMap = new HashMap<>();
        Map<String, Integer[]> corridorMap = new HashMap<>();

        // 기존 맵을 받아서 새로운 맵 생성
        for (Map.Entry<String, String> entry : seatInfo.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            String prefix = "";

            if (key.startsWith("seatNumbers.")) {
                prefix = "seatNumbers.";
            } else if (key.startsWith("corridorSeat.")) {
                prefix = "corridorSeat.";
            }

            switch (prefix) {
                case "seatNumbers.":
                    String seatKey = key.replaceAll("seatNumbers.", "");
                    Integer seatValue = Integer.valueOf(value);
                    seatMap.put(seatKey, seatValue);
                    break;
                case "corridorSeat.":
                    String corridorKey = key.replaceAll("corridorSeat.", "");
                    String[] valueArr = value.split(",");
                    Integer[] corridorValue = new Integer[valueArr.length];
                    for (int i = 0; i < valueArr.length; i++) {
                        corridorValue[i] = Integer.valueOf(valueArr[i].trim());
                    }
                    corridorMap.put(corridorKey, corridorValue);
                    break;
                default:
                    // 처리할 접두사가 없는 경우
                    break;
            }
        }
        // 이걸 이용해 새 맵을 만들고 저장하자. 내일 여기서부터.

// 좌석 번호 생성 및 저장
        for (Map.Entry<String, Integer> entry : seatMap.entrySet()) {
            String seatColumn = entry.getKey();
            Integer seatCount = entry.getValue();

            Integer[] corridorSeats = corridorMap.get(seatColumn);
            if (corridorSeats == null) {
                corridorSeats = new Integer[0];
            }

            for (int i = 1; i <= seatCount; i++) {
                String seatNumber = seatColumn + i;
                boolean isCorridorSeat = Arrays.asList(corridorSeats).contains(i);

                if (isCorridorSeat) {
                    seatNumber += "C";
                }

                SeatNumbers seatNumEntity = new SeatNumbers();
                seatNumEntity.setSeatNumber(seatNumber);
                seatNumEntity.setSeat(seat);
                seat.getSeatNumbersList().add(seatNumEntity);
                seatNumbersRepository.save(seatNumEntity);
            }
        }

        seatRepository.save(seat);
    }

    // seat 삭제 메소드
    public void deleteSeat(String id){
        Long seatId = Long.valueOf(id);
        seatNumbersRepository.deleteBySeatSeatId(seatId);
    }
    //신고 관련 메소드는 이 아래로
    public List<ReportDto> getReportListAll(){
        List<Report> reportList = reportRepository.findAll();
        List<ReportDto> list = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        for(Report e : reportList){
            ReportDto dto = new ReportDto();
            dto.setReportId(e.getReportId());
            dto.setNickname(e.getNickname());
            String formattedDate = e.getReportDate().format(formatter);
            dto.setReportDate(formattedDate);
            dto.setReportContent(e.getReportContent());
            dto.setCommentId(e.getCommentId());
            dto.setReportUserId(e.getUserId());
            if(e.getPostId() != null) dto.setPostId(e.getPostId());
            if(e.getCommentId() != null) dto.setCommentId(e.getCommentId());
            if(e.getReportStatus() == ReportStatus.PROCESS) {dto.setReportStatus("진행 중");} else {dto.setReportStatus("처리 완료");}
            list.add(dto);
        }
        return list;

    }

    //신고 처리완료
    public void reportProcessComplete(Long reportId){
        Optional<Report> reportOptional = reportRepository.findByReportId(reportId);
        if(reportOptional.isPresent()){
            Report report = reportOptional.get();
            report.setReportStatus(ReportStatus.COMPLETE);
            reportRepository.save(report);
        }
    }
    //신고받은 댓글 확인
    public CommentDto getComment(Long commentId){
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        CommentDto commentDto = new CommentDto();
        if(commentOptional.isPresent()){
            Comment comment = commentOptional.get();
            commentDto.setId(comment.getId());
            commentDto.setCommentContent(comment.getCommentContent());
            commentDto.setUserId(comment.getMemberInfo().getUserId());
            commentDto.setCommentDate(comment.getCommentDate());
            commentDto.setNickname(comment.getMemberInfo().getUserNickname());
        }
        return commentDto;
    }

    //댓글 삭제
    public void deleteComment(Long commentId){
        commentRepository.deleteById(commentId);
    }

    //신고된 게시글 확인
    public PostDto getPost(Long postId){
        Optional<Post> postOptional = postRepository.findById(postId);
        PostDto postDto = new PostDto();
        if(postOptional.isPresent()){
            Post post = postOptional.get();
            postDto.setId(post.getId());
            postDto.setMemberInfo(post.getMemberInfo());
            postDto.setPostTitle(post.getPostTitle());
            postDto.setPostContent(post.getPostContent());
            postDto.setPostImageUrl(post.getPostImageUrl());
            postDto.setPostCategory(post.getPostCategory());
            postDto.setPostViews(post.getPostViews());
            postDto.setPostDate(post.getPostDate());
        }
        return postDto;
    }

    //공지 등록
    public void writePost(String title, String content){
        Post post = new Post();
        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByAuthority(Authority.ROLE_ADMIN);
        MemberInfo memberInfo = memberInfoOptional.get();
        post.setPostTitle(title);
        post.setPostContent(content);
        post.setPostCategory("2");
        post.setMemberInfo(memberInfo);
        post.setPostDate(LocalDateTime.now());
        postRepository.save(post);
    }












}
