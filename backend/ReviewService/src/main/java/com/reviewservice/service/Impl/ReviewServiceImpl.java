package com.reviewservice.service.Impl;

import com.reviewservice.modal.Review;
import com.reviewservice.payload.dto.SalonDto;
import com.reviewservice.payload.dto.UserDto;
import com.reviewservice.payload.request.ReviewRequest;
import com.reviewservice.payload.response.ApiResponse;
import com.reviewservice.payload.response.ReviewResponse;
import com.reviewservice.repository.ReviewRepository;
import com.reviewservice.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewServiceCB reviewServiceCB;

    @Override
    public Review createReview(ReviewRequest reviewRequest, UserDto userDto, SalonDto salonDto) {
        Review review = new Review();
        review.setReviewText(reviewRequest.getReviewText());
        review.setRating(reviewRequest.getRating());
        review.setUserId(userDto.getId());
        review.setSalonId(salonDto.getId());
        return reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> getReviewsBySalonId(Long salonId) {
        List<Review> reviews = reviewRepository.findBySalonId(salonId);

        return reviews.stream().map(review -> {
            ReviewResponse reviewResponse = new ReviewResponse();
            reviewResponse.setId(review.getId());
            reviewResponse.setReviewText(review.getReviewText());
            reviewResponse.setRating(review.getRating());
            reviewResponse.setUserId(review.getUserId());
            reviewResponse.setSalonId(review.getSalonId());
            try {
                ApiResponse<UserDto> userDtoApiResponse = reviewServiceCB.getUserById(review.getUserId());
                if(userDtoApiResponse.isSuccess() && userDtoApiResponse.getData() != null){
                    reviewResponse.setUserName(userDtoApiResponse.getData().getFullName());
                }
                else{
                    reviewResponse.setUserName("Unknown User");
                }
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
            return reviewResponse;
        }).toList();
    }

    private Review getReviewById(Long id) throws Exception{
        return reviewRepository.findById(id).orElseThrow(()->new Exception("Review not exist.."));
    }

    @Override
    public Review updateReview(ReviewRequest reviewRequest, Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(!review.getUserId().equals(userId)){
            throw new Exception("You don't have permission to update this review");
        }
        review.setReviewText(reviewRequest.getReviewText());
        review.setRating(reviewRequest.getRating());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(!review.getUserId().equals(userId)){
            throw new Exception("You don't have permission to delete this review");
        }
        reviewRepository.delete(review);
    }


}
