package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPerformanceListDTO {

    private int start;

    private int size;

    private String performance_id;

}
