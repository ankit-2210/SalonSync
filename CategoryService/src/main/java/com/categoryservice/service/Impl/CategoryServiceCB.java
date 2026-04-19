package com.categoryservice.service.Impl;

import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.service.client.SalonFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceCB {
    private final SalonFeignClient salonFeignClient;

    @Retry(name = "salonOwnerRetry", fallbackMethod = "salonOwnerFallback")
    @CircuitBreaker(name = "salonOwnerCB", fallbackMethod = "salonOwnerFallback")
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

    // ger salon by id
    @Retry(name = "salonByIdRetry", fallbackMethod = "salonByIdFallback")
    @CircuitBreaker(name = "salonByIdCB", fallbackMethod = "salonByIdFallback")
    public ApiResponse<SalonDto> getSalonById(Long salonId) throws Exception {
        ResponseEntity<ApiResponse<SalonDto>> response = salonFeignClient.getSalonById(salonId);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Salon not found", null);
        }
        return response.getBody();
    }


}
