package com.kh.finalPlayTime.repository;

import com.kh.finalPlayTime.entity.MemberInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest // 스프링 컨텍스트를 로드하여 테스트 환경을 설정.
@Transactional // 데이터베이스 논리적인 작업 단위, 모두 성공하는 경우가 아니면 롤백 (테스트에서는 자동롤백)
@TestPropertySource(locations = "classpath:application-test.properties")
@Slf4j // 로깅 데이터를 처리하기 위해 사용
public class MemberInfoRepositoryTest {

}
