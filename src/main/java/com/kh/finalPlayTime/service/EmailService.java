package com.kh.finalPlayTime.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Slf4j
@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("devpawcommunity@naver.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String secondPw;
    private String authKey;
    public String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = random.nextInt(3);
            switch (index) {
                case 0:
                    key.append((char) ((int) (random.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (random.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((random.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    // 메일 작성
    public MimeMessage createEmailMessage(String to) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();
        secondPw = createKey();
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("PlayTime 임시 비밀번호 발송");

        String msg="";
        msg += "<p>안녕하세요 PlayTime 입니다.</p>";
        msg += "<p>비밀번호 찾기를 통해 임시 비밀번호가 발송 되었습니다</p>";
        msg += "<p>아래 임시 비밀번호로 로그인 하시고 바로 변경하시길 바랍니다.</p>";
        msg += "<h3>임시 비밀번호 : " + secondPw + "</h3>";
        msg += "<p>감사합니다.</p>";

        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("playtimedevelop@gmail.com", "PlayTime"));

        return message;
    }

    // 이메일 보내기
    public String sendPasswordAuthKey(String to) throws Exception {

        MimeMessage message = createEmailMessage(to); // 메일 발송
        try {// 예외처리
            javaMailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return secondPw; // 메일로 보냈던 인증 코드를 서버로 반환
    }

    // 이메일 인증 메일 작성
    public MimeMessage createAuthEmailMessage(String to) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();
        authKey = createKey();
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("PlayTime 회원가입 메일 인증번호 발송");

        String msg="";
        msg += "<p>안녕하세요 PlayTime 입니다.</p>";
        msg += "<p>회원가입 이메일 인증번호가 발송 되었습니다</p>";
        msg += "<p>발송된 인증번호를 입력하시기 바랍니다.</p>";
        msg += "<h3>인증 번호 : " + authKey + "</h3>";
        msg += "<p>감사합니다.</p>";

        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("playtimedevelop@gmail.com", "PlayTime"));

        return message;
    }

    // 이메일 인증 메일 보내기
    public String sendAuthMailKey(String to) throws Exception {

        MimeMessage message = createAuthEmailMessage(to); // 메일 발송
        try {// 예외처리
            javaMailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return authKey; // 메일로 보냈던 인증 코드를 서버로 반환
    }

    // 이메일 인증 메일 작성
    public MimeMessage createMypageEmailAuth(String to) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();
        authKey = createKey();
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("PlayTime 메일 인증번호 발송");

        String msg="";
        msg += "<p>안녕하세요 PlayTime 입니다.</p>";
        msg += "<p>인증번호가 발송 되었습니다</p>";
        msg += "<p>발송된 인증번호를 입력하시기 바랍니다.</p>";
        msg += "<h3>인증 번호 : " + authKey + "</h3>";
        msg += "<p>감사합니다.</p>";

        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("playtimedevelop@gmail.com", "PlayTime"));

        return message;
    }

    // 이메일 인증 메일 보내기
    public String mypageEmailAuthKey(String to) throws Exception {

        MimeMessage message = createMypageEmailAuth(to); // 메일 발송
        try {// 예외처리
            javaMailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return authKey; // 메일로 보냈던 인증 코드를 서버로 반환
    }
}