package com.kh.finalPlayTime.kakao.service;

import com.kh.finalPlayTime.kakao.client.OAuthApiClient;
import com.kh.finalPlayTime.kakao.constant.OAuth;
import com.kh.finalPlayTime.kakao.params.OAuthLoginParams;
import com.kh.finalPlayTime.kakao.response.OAuthInfoResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class RequestOAuthInfoService {
    private final Map<OAuth, OAuthApiClient> clients;

    public RequestOAuthInfoService(List<OAuthApiClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(OAuthApiClient::oAuthProvider, Function.identity())
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params) {
        OAuthApiClient client = clients.get(params.oAuth());
        String accessToken = client.requestAccessToken(params);
        return client.requestOauthInfo(accessToken);
    }
}