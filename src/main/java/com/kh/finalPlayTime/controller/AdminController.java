package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.*;
import com.kh.finalPlayTime.service.AdminService;
import com.kh.finalPlayTime.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequestMapping("/admin")
@Controller
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final PostService postService;
    @GetMapping("")
    public String adminMainPage(){
        return "admin/main";
    }

    // 회원 관리 컨트롤러 시작
    @GetMapping("/member")
    public String adminMemberPage(){
        return "admin/member";
    }

    @GetMapping("/getAllMember")
    public String adminGetAllMember(@RequestParam(required = false) String userId, Model model){
        List<MemberDto> list;

        if (userId != null) {
            // userId가 제공된 경우, 해당 회원만 필터링
            list = adminService.getMemberList().stream()
                    .filter(member -> member.getUserId().equals(userId))
                    .collect(Collectors.toList());
        } else {
            // userId가 제공되지 않은 경우, 모든 회원 조회
            list = adminService.getMemberList();
        }

        model.addAttribute("list", list);
        return "admin/member/member";
    }

    @GetMapping("/memberDetail")
    public String adminMemberDetail(@RequestParam String userId, Model model){
        MemberDto dto = adminService.getMember(userId);
        model.addAttribute("dto", dto);
        return "admin/member/memberDetail";
    }
    //멤버 차단
    @GetMapping("/blockMember")
    public String adminBlockMember(@RequestParam String userId, Model model){
        adminService.blockMember(userId);
        MemberDto dto = adminService.getMember(userId);
        model.addAttribute("dto", dto);
        return "admin/member/memberDetail";
    }

    @PostMapping("/deleteMember")
    public String adminDeleteMember(@RequestParam String userId, Model model){
        adminService.deleteMember(userId);
        return "redirect:/admin/getAllMember";
    }

    // 게시판 관리 컨트롤러 시작

    @GetMapping("/post")
    public String adminPost(@RequestParam(required = false) String title, Model model){
        List<PostDto> postList = postService.getAllPosts();
        model.addAttribute("list", postList);
        return "admin/post/post";
    }

    //게시판에 공지글 작성하기
    @GetMapping("/writePost")
    public String adminWritePost(){
        return "admin/post/write";
    }

    @PostMapping("/writePost2")
    public String adminWritePost2(@RequestParam String title,
                                  @RequestParam String content,
                                  Model model){
        adminService.writePost(title, content);
        List<PostDto> postList = postService.getAllPosts();
        model.addAttribute("list", postList);
        return "admin/post/post";
    }


    //게시판 상세 정보
    @GetMapping("/postDetail")
    public String adminPostDetail(@RequestParam Long postId, Model model){
        PostDto postDto = adminService.getPost(postId);

        model.addAttribute("dto", postDto);
        return "admin/post/postDetail";
    }
    //게시글 삭제 컨트롤러
    @GetMapping("/deletePost")
    public String deletePost(@RequestParam Long postId, Model model){
        postService.deletePostById(postId);
        List<PostDto> postList = postService.getAllPosts();
        model.addAttribute("list", postList);
        return "admin/post/post";
    }
    //댓글 보기
    @GetMapping("/commentDetail")
    public String adminComment(@RequestParam Long commentId, Model model){
        CommentDto commentDto = adminService.getComment(commentId);
        if(commentDto != null) {
            model.addAttribute("dto", commentDto);
            return "admin/post/comment";
        } else return "redirect:/admin/report";
    }
    //댓글 삭제
    @GetMapping("/deleteComment")
    public String deleteComment(@RequestParam Long commentId){
        adminService.deleteComment(commentId);
        return "redirect:/admin/report";
    }

    // 공연 관리 컨트롤러 부분

    // 공연 목록 불러오고, 검색하기
    @GetMapping("/playlist")
    public String adminPlaylist(@RequestParam(required = false) String title, Model model){
        List<PlayInfoDto> list;

        if (title != null) {
            // playId가 제공된 경우, 해당 회원만 필터링
            list = adminService.getPlayListAll().stream()
                    .filter(play -> play.getTitle().contains(title))
                    .collect(Collectors.toList());
        } else {
            // playId가 제공되지 않은 경우, 모든 회원 조회
            list = adminService.getPlayListAll();
        }

        model.addAttribute("list", list);
        return "admin/play/playlist";
    }

    @GetMapping("/playlist/delete")
    public String adminDeletePlay(@RequestParam String playId){
        adminService.deletePlay(playId);
        return "redirect:/admin/playlist";
    }

    //극장 관리 컨트롤러
    @GetMapping("/theater")
    public String theaterList(@RequestParam(required = false) String name, Model model){
        List<TheaterDto> list;
        if(name != null){
            //극장 이름이 제공된 경우
            list = adminService.getTheaterListAll().stream()
                    .filter(theater -> theater.getTheaterName().contains(name))
                    .collect(Collectors.toList());
        } else {
            list = adminService.getTheaterListAll();
        }
        model.addAttribute("list", list);
        return "admin/theater/theaterList";
    }

    // 좌석 관리 컨트롤러
    @PostMapping("/seatManagement")
    public String theaterSeatManagement(@RequestParam("id") String id,
                                        @RequestParam("name") String name,
                                        Model model) {
        SeatDto seatDto = adminService.getSeat(id, name);

        // 필요한 데이터를 Model 객체에 추가
        model.addAttribute("seatDto", seatDto);



        return "admin/theater/theaterSeat"; // 좌석 관리 페이지로
    }

    //좌석 생성 컨트롤러
    @PostMapping("/createSeat")
    public String createSeat(@RequestParam("seatId") String seatId,
                             @RequestParam("theaterId") String theaterId,
                             @RequestParam("theaterName") String theaterName,
                             Model model){
        // 예시: 전달받은 정보를 다시 넘겨주기만 하는 경우
        model.addAttribute("seatId", seatId);
        model.addAttribute("theaterId", theaterId);
        model.addAttribute("theaterName", theaterName);

        return "admin/theater/createSeat";
    }

    //좌석 생성 컨트롤러 2단계
    @PostMapping("/createSeatStep2")
    public String createSeatStep2(@RequestParam Map<String, String> seatInfo,
                                  Model model) {
        adminService.createSeat(seatInfo);
        SeatDto seatDto = adminService.getSeat(seatInfo.get("theaterId"), seatInfo.get("theaterName"));
        model.addAttribute("seatDto", seatDto);
        return "admin/theater/theaterSeat";
    }

    //좌석 삭제 컨트롤러
    @PostMapping("/deleteSeat")
    public String deleteSeat(@RequestParam("seatId") String seatId,
                             @RequestParam("theaterId") String theaterId,
                             @RequestParam("theaterName") String theaterName,
                             Model model){
        adminService.deleteSeat(seatId);
        SeatDto seatDto = adminService.getSeat(theaterId, theaterName);
        model.addAttribute("seatDto", seatDto);
        return "admin/theater/theaterSeat";
    }

    //신고 관련 컨트롤러
    @GetMapping("/report")
    public String getReportListAll(Model model){
        List<ReportDto> list = adminService.getReportListAll();
        model.addAttribute("list", list);
        return "admin/report/report";
    }
    //신고 처리 컨트롤러
    @PostMapping("/completeReport")
    public String completeReport(@RequestParam("reportId") String reportId, Model model){
        Long id = Long.parseLong(reportId);
        adminService.reportProcessComplete(id);

        return "redirect:/admin/report/";
    }

    //결제 내역 컨트롤러
    @GetMapping("/payment")
    public String paymentList(@RequestParam(required = false) String userId,
                              @RequestParam(required = false) String playId,
                              @RequestParam(required = false) String title, Model model){
        List<ReserveDto> list;
        if (userId != null) {
            // User ID가 제공된 경우
            list = adminService.getReserveAll().stream()
                    .filter(reserveDto -> reserveDto.getUserId().contains(userId))
                    .collect(Collectors.toList());
        } else if (playId != null) {
            // Play ID가 제공된 경우
            list = adminService.getReserveAll().stream()
                    .filter(reserveDto -> reserveDto.getPlayId().contains(playId))
                    .collect(Collectors.toList());
        } else if(title != null){
            list = adminService.getReserveAll().stream()
                    .filter(reserveDto -> reserveDto.getPlayTitle().contains(title))
                    .collect(Collectors.toList());
        }
        else {
            list = adminService.getReserveAll();
        }
        model.addAttribute("list", list);
        return "admin/payment/payment";
    }

}
