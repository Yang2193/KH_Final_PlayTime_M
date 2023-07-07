package com.kh.finalPlayTime.controller;

import com.kh.finalPlayTime.dto.ReportDto;
import com.kh.finalPlayTime.entity.MemberInfo;
import com.kh.finalPlayTime.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/report")
    public ResponseEntity<?> createReport(@RequestBody ReportDto reportDto) {
        reportService.createReport(reportDto);
        return ResponseEntity.ok().build();
    }
}