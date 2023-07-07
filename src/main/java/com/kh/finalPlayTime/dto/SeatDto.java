package com.kh.finalPlayTime.dto;

import com.kh.finalPlayTime.entity.SeatNumbers;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter@Setter@ToString
public class SeatDto {
    private Long seatId;
    private String theaterId;
    private String theaterName;
    private List<SeatNumbers> seatNumbers;
    private Map<String, List<String>> seatMap;
    public void convertSeatNumbersToMap() {
        List<String> seatNumberList = seatNumbers.stream()
                .map(SeatNumbers::getSeatNumber)
                .collect(Collectors.toList());

        seatMap = convertToSeatNumbersMap(seatNumberList);
    }

    private Map<String, List<String>> convertToSeatNumbersMap(List<String> seatNumbers) {
        Map<String, List<String>> seatNumbersMap = new HashMap<>();

        for (String seatNumber : seatNumbers) {
            String row = seatNumber.substring(0, 1);
            String seat = seatNumber.substring(1);

            if (!seatNumbersMap.containsKey(row)) {
                seatNumbersMap.put(row, new ArrayList<>());
            }
            seatNumbersMap.get(row).add(seat);
        }

        return seatNumbersMap;
    }

}
