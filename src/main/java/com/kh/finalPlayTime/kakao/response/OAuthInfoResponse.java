package com.kh.finalPlayTime.kakao.response;

import com.kh.finalPlayTime.kakao.constant.OAuth;

public interface OAuthInfoResponse {
    String getEmail();
    String getNickname();
    OAuth getOAuthProvider();
}
