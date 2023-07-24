package com.kh.finalPlayTime.repository;


import com.kh.finalPlayTime.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByCommentDate(Long postId);
    List<Comment> findByMemberInfoUserId(String userId);
    Optional<Comment> findById(Long commentId);
    void deleteByMemberInfoUserId(String userId);


}