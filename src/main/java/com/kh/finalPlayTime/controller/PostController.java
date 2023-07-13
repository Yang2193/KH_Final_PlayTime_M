package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.OneLineReviewDto;
import com.kh.finalPlayTime.dto.PostDto;
import com.kh.finalPlayTime.entity.OneLineReview;
import com.kh.finalPlayTime.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/select")
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> postList = postService.getAllPosts();
        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @GetMapping("/select/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId) {
        PostDto post = postService.getPostById(postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/increase-views")
    public void increasePostViews(@PathVariable Long postId) {
        postService.increasePostViews(postId);
    }

    @PostMapping("/postUpload")
    public ResponseEntity<PostDto> addPost(@RequestBody PostDto postDto) {
        PostDto savedPost = postService.addPost(postDto);
        return ResponseEntity.ok(savedPost);
    }

    @PostMapping("/delete/{postId}")
    public ResponseEntity<String> deletePostById(@PathVariable Long postId) {
        postService.deletePostById(postId);
        return ResponseEntity.ok("게시물 삭제 성공");
    }

    @PostMapping("/update/{postId}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long postId, @RequestBody PostDto postDto) {
        PostDto updatedPost = postService.updatePost(postId, postDto);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/search")
    public ResponseEntity<List<PostDto>> searchPostsByKeyword(@RequestParam String keyword) {
        List<PostDto> searchResults = postService.searchPostsByKeyword(keyword);
        return ResponseEntity.ok(searchResults);
    }
    //한줄평 조회
    @GetMapping("/select/oneLineReview")
    public ResponseEntity<List<OneLineReview>> selectOneLineReview(@RequestParam String playId) {
        List<OneLineReview> list = postService.getOneLineReview(playId);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    // 한줄평 추가
    @PostMapping("/insert/oneLineReview")
    public ResponseEntity<OneLineReviewDto> addOneLineReview(@RequestBody OneLineReviewDto oneLineReview) {
        OneLineReviewDto addOLR = postService.addOneLineReview(oneLineReview.getOlrContent(),oneLineReview.getOlrRating(),oneLineReview.getUserId(), oneLineReview.getPlayId());
        return ResponseEntity.ok(addOLR);
    }
    // 한줄평 삭제
    @PostMapping("/delete/oneLineReview")
    public ResponseEntity<String> deleteOLR(@RequestParam Long olrId) {
        postService.deleteOLR(olrId);
        return ResponseEntity.ok("한줄평 삭제 완료");
    }
    // 한줄평 수정
    @PostMapping("/update/oneLineReview")
    public ResponseEntity<String> updateOLR(@RequestBody OneLineReviewDto oneLineReviewDto) {
        Long olrId = oneLineReviewDto.getOlrId();
        String olrContent = oneLineReviewDto.getOlrContent();
        double olrRating = oneLineReviewDto.getOlrRating();
        postService.updateOneLineReview(olrId,olrContent,olrRating);
        return ResponseEntity.ok("한줄평 수정 완료");
    }

}
