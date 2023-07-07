package com.kh.finalPlayTime.service;

import com.kh.finalPlayTime.constant.ReportStatus;
import com.kh.finalPlayTime.dto.ReportDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.entity.Report;
import com.kh.finalPlayTime.repository.MemberInfoRepository;
import com.kh.finalPlayTime.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final MemberInfoRepository memberInfoRepository;

    public void createReport(ReportDto reportDto) {
        Report report = new Report();
        report.setNickname(reportDto.getNickname());
        report.setUserId(reportDto.getReportUserId());
        report.setPostId(reportDto.getPostId());
        report.setCommentId(reportDto.getCommentId());
        report.setReportContent(reportDto.getReportContent());
        report.setReportDate(LocalDateTime.now());
        report.setReportStatus(ReportStatus.PROCESS);
        reportRepository.save(report);
    }

    public String findMemberId(String userNickname){

        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findByUserNickname(userNickname);
        if(memberInfoOptional.isPresent()){
            MemberInfo memberInfo = memberInfoOptional.get();
            return  memberInfo.getUserId();
        }
        return "없어요ㅠㅠ";
    }
}
