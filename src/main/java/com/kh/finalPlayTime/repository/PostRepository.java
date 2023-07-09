package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAll(); // 모든 게시물을 가져오는 메서드 추가
    List<Post> findByMemberInfoUserId(String userId);
    void deleteById(Long id);
    List<Post> findByPostTitleContainingIgnoreCase(String keyword);
}
