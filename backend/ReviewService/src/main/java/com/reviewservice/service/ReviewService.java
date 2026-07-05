package com.reviewservice.service;

import com.reviewservice.modal.Review;
import com.reviewservice.payload.dto.SalonDto;
import com.reviewservice.payload.dto.UserDto;
import com.reviewservice.payload.request.ReviewRequest;
import com.reviewservice.payload.response.ReviewResponse;

import java.util.*;


public interface ReviewService {
    public Review createReview(ReviewRequest reviewRequest, UserDto userDto, SalonDto salonDto);

    List<ReviewResponse> getReviewsBySalonId(Long salonId);

    Review updateReview(ReviewRequest reviewRequest, Long reviewId, Long userId) throws Exception;

    void deleteReview(Long reviewId, Long userId) throws Exception;

}
