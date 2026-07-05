package com.apigateway.controller;

import com.apigateway.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class FallbackController {
    private Mono<ResponseEntity<ApiResponse<Object>>> buildResponse(String message) {
        return Mono.just(ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new ApiResponse<>(false, message, null)));
    }

    @GetMapping("/fallback/users")
    public Mono<ResponseEntity<ApiResponse<Object>>> users() {
        return buildResponse("User Service Down");
    }

    @PostMapping("/fallback/auth")
    public Mono<ResponseEntity<ApiResponse<Object>>> usersPost() {
        return buildResponse("User Service Down - POST");
    }

    @GetMapping("/fallback/bookings")
    public Mono<ResponseEntity<ApiResponse<Object>>> bookings() {
        return buildResponse("Booking Service Down");
    }

    @PostMapping("/fallback/bookings")
    public Mono<ResponseEntity<ApiResponse<Object>>> bookingsPost() {
        return buildResponse("Booking Service Down (Post)");
    }

    @GetMapping("/fallback/payments")
    public Mono<ResponseEntity<ApiResponse<Object>>> payments() {
        return buildResponse("Payment Service Down");
    }

    @PostMapping("/fallback/payments")
    public Mono<ResponseEntity<ApiResponse<Object>>> paymentsPost() {
        return buildResponse("Payment Service Down - POST");
    }

    @GetMapping("/fallback/salons")
    public Mono<ResponseEntity<ApiResponse<Object>>> salons() {
        return buildResponse("Salon Service Down");
    }

    @PostMapping("/fallback/salons")
    public Mono<ResponseEntity<ApiResponse<Object>>> salonsPost() {
        return buildResponse("Salon Service Down - Post");
    }


    @GetMapping("/fallback/categories")
    public Mono<ResponseEntity<ApiResponse<Object>>> categories() {
        return buildResponse("Category Service Down");
    }

    @PostMapping("/fallback/categories")
    public Mono<ResponseEntity<ApiResponse<Object>>> categoriesPost() {
        return buildResponse("Category Service Down - POST");
    }


    @GetMapping("/fallback/offeringService")
    public Mono<ResponseEntity<ApiResponse<Object>>> offering() {
        return buildResponse("Offering Service Down");
    }

    @PostMapping("/fallback/offeringService")
    public Mono<ResponseEntity<ApiResponse<Object>>> offeringPost() {
        return buildResponse("Offering Service Down - POST");
    }


    @GetMapping("/fallback/notifications")
    public Mono<ResponseEntity<ApiResponse<Object>>> notifications() {
        return buildResponse("Notification Service Down");
    }

    @PostMapping("/fallback/notifications")
    public Mono<ResponseEntity<ApiResponse<Object>>> notificationsPost() {
        return buildResponse("Notification Service Down (Post)");
    }

    @PutMapping("/fallback/notifications")
    public Mono<ResponseEntity<ApiResponse<Object>>> notificationsPut() {
        return buildResponse("Notification Service Down - Put");
    }

    @GetMapping("/fallback/reviews")
    public Mono<ResponseEntity<ApiResponse<Object>>> reviews() {
        return buildResponse("Review Service Down");
    }

    @PostMapping("/fallback/reviews")
    public Mono<ResponseEntity<ApiResponse<Object>>> reviewsPost() {
        return buildResponse("Review Service Down - POST");
    }
}
