package com.categoryservice.service.Impl;

import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.service.client.SalonFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceCB {
    private final SalonFeignClient salonFeignClient;

    @CircuitBreaker(name = "salonCB", fallbackMethod = "salonOwnerFallback")
    public ApiResponse<List<SalonDto>> getSalonByOwnerId(String jwt) throws Exception {
        ResponseEntity<ApiResponse<List<SalonDto>>> response = salonFeignClient.getSalonByOwnerId(jwt);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Salon Service returned empty response", null);
        }
        return response.getBody();
    }

    public ApiResponse<List<SalonDto>> salonOwnerFallback(String jwt, Throwable t) {
        System.out.println("Fallback triggered due to: " + t.getMessage());
        return new ApiResponse<>(false, "Salon Service is currently unavailable. Please try again later.", null);
    }
}
