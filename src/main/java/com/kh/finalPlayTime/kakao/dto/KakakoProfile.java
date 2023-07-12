package com.kh.finalPlayTime.kakao.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakakoProfile {
    public Long id;
    public String connected_at;
    public Properties properties;
    public KakaoAccount kakao_account;

    @Getter
    @Setter
    public class Properties {
        public String nickname;
    }

    @Getter
    @Setter
    public class KakaoAccount {
        public Boolean profile_nickname_needs_agreement;
        public Profile profile;
        public Boolean has_email;
        public Boolean email_needs_agreement;
        public Boolean is_email_valid;
        public Boolean is_email_verified;
        public String email;

        @Getter
        @Setter
        public class Profile {
            public String nickname;

        }
    }
}





