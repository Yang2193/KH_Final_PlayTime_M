package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.dto.PostDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.entity.Post;
import com.kh.finalPlayTime.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    // 모든 게시물 조회 기능
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "postCategory", "postDate"));
        List<PostDto> postDtoList = convertToDtoList(posts);
        return postDtoList;
    }

    // 게시물 ID로 게시물 조회 기능
    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            return convertToDto(post);
        }
        return null;
    }

    // 게시물 조회수 증가 기능
    public void increasePostViews(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            post.setPostViews(post.getPostViews() + 1);
        }
    }

    // 게시물 추가 기능
    public PostDto addPost(PostDto postDto) {
        Post post = convertToPost(postDto);
        post.setPostDate(LocalDateTime.now()); // 현재 시간 설정

        String userId = postDto.getUserId(); // userId 받아오기
        if (userId != null) {
            MemberInfo memberInfo = new MemberInfo();
            memberInfo.setUserId(userId);
            post.setMemberInfo(memberInfo);
        }
        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }

    // 게시물 목록을 Dto 리스트로 변환하는 기능
    private List<PostDto> convertToDtoList(List<Post> posts) {
        List<PostDto> dtoList = new ArrayList<>();
        for (Post post : posts) {
            PostDto postDto = convertToDto(post);
            dtoList.add(postDto);
        }
        return dtoList;
    }

    // Dto 객체를 Post 객체로 변환하는 기능
    public Post convertToPost(PostDto postDto) {
        Post post = new Post();
        post.setPostTitle(postDto.getPostTitle());
        post.setPostContent(postDto.getPostContent());
        post.setPostImageUrl(postDto.getPostImageUrl());
        post.setPostCategory(postDto.getPostCategory());
        post.setPostViews(postDto.getPostViews());
        return post;
    }

    // Post 객체를 Dto 객체로 변환하는 기능
    private PostDto convertToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setMemberInfo(post.getMemberInfo());
        postDto.setPostTitle(post.getPostTitle());
        postDto.setPostContent(post.getPostContent());
        postDto.setPostImageUrl(post.getPostImageUrl());
        postDto.setPostCategory(post.getPostCategory());
        postDto.setPostViews(post.getPostViews());
        postDto.setPostDate(post.getPostDate());
        return postDto;
    }

    // 특정 회원의 게시물 목록을 조회하는 기능
    public List<PostDto> getMemberPosts(String userId) {
        List<Post> posts = postRepository.findByMemberInfoUserId(userId);
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            PostDto postDto = new PostDto();
            postDto.setId(post.getId());
            postDto.setMemberInfo(post.getMemberInfo());
            postDto.setPostTitle(post.getPostTitle());
            postDto.setPostContent(post.getPostContent());
            postDto.setPostImageUrl(post.getPostImageUrl());
            postDto.setPostCategory(post.getPostCategory());
            postDto.setPostViews(post.getPostViews());
            postDto.setPostDate(post.getPostDate());
            postDtos.add(postDto);
        }
        return postDtos;
    }

    // 게시물 삭제 기능
    public void deletePostById(Long postId) {
        postRepository.deleteById(postId);
    }

    // 게시물 수정 기능
    public PostDto updatePost(Long postId, PostDto postDto) {
        Post existingPost = postRepository.findById(postId).orElse(null);
        if (existingPost != null) {
            existingPost.setPostTitle(postDto.getPostTitle());
            existingPost.setPostContent(postDto.getPostContent());
            existingPost.setPostImageUrl(postDto.getPostImageUrl());
            Post updatedPost = postRepository.save(existingPost);
            return convertToDto(updatedPost);
        }
        return null;
    }

    // 특정 키워드를 포함하는 게시물 목록 조회 기능
    public List<PostDto> searchPostsByKeyword(String keyword) {
        List<Post> posts = postRepository.findByPostTitleContainingIgnoreCase(keyword);
        List<PostDto> postDtoList = convertToDtoList(posts);
        return postDtoList;
    }
}
