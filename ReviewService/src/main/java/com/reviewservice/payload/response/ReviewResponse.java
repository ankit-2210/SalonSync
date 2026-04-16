package com.reviewservice.payload.response;

import lombok.Data;

@Data
public class ReviewResponse {
    private Long id;
    private String reviewText;
    private Double rating;
    private Long userId;
    private Long salonId;
    private String userName;
}
