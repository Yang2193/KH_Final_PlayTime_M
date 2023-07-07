package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.entity.PlayLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayLikeRepository extends JpaRepository<PlayLike,Long> {
        List<PlayLike> findByMemberInfoUserId(String userId);
        PlayLike findByMemberInfoUserIdAndPlayInfoPlayId(String userId, String playId);


}

