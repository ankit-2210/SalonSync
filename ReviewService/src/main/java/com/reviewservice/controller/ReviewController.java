package com.reviewservice.controller;

import com.reviewservice.modal.Review;
import com.reviewservice.payload.dto.SalonDto;
import com.reviewservice.payload.dto.UserDto;
import com.reviewservice.payload.response.ApiResponse;
import com.reviewservice.payload.request.ReviewRequest;
import com.reviewservice.payload.response.ReviewResponse;
import com.reviewservice.service.Impl.ReviewServiceCB;
import com.reviewservice.service.ReviewService;
import com.reviewservice.service.client.SalonFeignClient;
import com.reviewservice.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewServiceCB reviewServiceCB;

    @PostMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<Review>> createReview(@PathVariable Long salonId, @RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = reviewServiceCB.getUserProfile(jwt).getData();
        SalonDto salonDto = reviewServiceCB.getSalonById(salonId).getData();
        Review review = reviewService.createReview(reviewRequest, userDto, salonDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Review created successfully", review));
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewBySalonId(@PathVariable Long salonId, @RequestHeader("Authorization") String jwt) throws Exception {
        List<ReviewResponse> reviews = reviewService.getReviewsBySalonId(salonId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Reviews fetched successfully", reviews));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Review>> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto =  reviewServiceCB.getUserProfile(jwt).getData();
        Review review = reviewService.updateReview(reviewRequest, reviewId, userDto.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Review updated successfully", review));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long reviewId, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = reviewServiceCB.getUserProfile(jwt).getData();
        reviewService.deleteReview(reviewId, userDto.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Review deleted successfully", null));
    }


}
