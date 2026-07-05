package com.reviewservice.model;

import com.reviewservice.modal.Review;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;


public class ReviewTest {
    @Test
    void testReviewModel(){
        Review review = new Review();
        LocalDateTime now = LocalDateTime.now();

        review.setId(1L);
        review.setReviewText("Great service");
        review.setRating(4.5);
        review.setSalonId(100L);
        review.setUserId(200L);
        review.setCreatedAt(now);

        // assert
        assertEquals(1L, review.getId());
        assertEquals("Great service", review.getReviewText());
        assertEquals(4.5, review.getRating());
        assertEquals(100L, review.getSalonId());
        assertEquals(200L, review.getUserId());
        assertEquals(now, review.getCreatedAt());
    }

}
