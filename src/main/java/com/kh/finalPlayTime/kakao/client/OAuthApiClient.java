package com.kh.finalPlayTime.kakao.client;

import com.kh.finalPlayTime.kakao.constant.OAuth;
import com.kh.finalPlayTime.kakao.params.OAuthLoginParams;
import com.kh.finalPlayTime.kakao.response.OAuthInfoResponse;

public interface OAuthApiClient {
    OAuth oAuthProvider();
    String requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(String accessToken);
}
