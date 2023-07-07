package com.kh.finalPlayTime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FinalPlayTimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalPlayTimeApplication.class, args);
	}

}
