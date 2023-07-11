package com.kh.finalPlayTime.kakao.params;

import com.kh.finalPlayTime.kakao.constant.OAuth;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuth oAuth();
    MultiValueMap<String, String> makeBody();
}
