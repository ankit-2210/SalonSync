package com.apigateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class FallbackController {
    @GetMapping("/fallback/users")
    public Mono<String> users() {
        return Mono.just("User Service Down");
    }

    @GetMapping("/fallback/bookings")
    public Mono<String> bookings() {
        return Mono.just("Booking Service Down");
    }

    @PostMapping("/fallback/bookings")
    public Mono<String> bookingsPost() {
        return Mono.just("Booking Service Down (Post)");
    }

    @GetMapping("/fallback/payments")
    public Mono<String> payments() {
        return Mono.just("Payment Service Down");
    }

    @GetMapping("/fallback/salons")
    public Mono<String> salons() {
        return Mono.just("Salon Service Down");
    }

    @GetMapping("/fallback/categories")
    public Mono<String> categories() {
        return Mono.just("Category Service Down");
    }

    @GetMapping("/fallback/offeringService")
    public Mono<String> offering() {
        return Mono.just("Offering Service Down");
    }

    @GetMapping("/fallback/notifications")
    public Mono<String> notifications() {
        return Mono.just("Notification Service Down");
    }

    @PostMapping("/fallback/notifications")
    public Mono<String> notificationsPost() {
        return Mono.just("Notification Service Down (Post)");
    }

    @PutMapping("/fallback/notifications")
    public Mono<String> notificationsPut() {
        return Mono.just("Notification Service Down (Put)");
    }


    @GetMapping("/fallback/reviews")
    public Mono<String> reviews() {
        return Mono.just("Review Service Down");
    }
}
