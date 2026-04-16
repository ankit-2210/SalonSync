package com.reviewservice.mapper;

import com.reviewservice.modal.Review;
import com.reviewservice.payload.response.ReviewResponse;

public class ReviewMapper {
    public static ReviewResponse mapToDto(Review review){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setId(review.getId());
        reviewResponse.setReviewText(review.getReviewText());
        reviewResponse.setRating(review.getRating());
        reviewResponse.setUserId(review.getUserId());
        reviewResponse.setSalonId(review.getSalonId());
        return reviewResponse;
    }
}
