package com.reviewservice.service.Impl;

import com.reviewservice.payload.dto.SalonDto;
import com.reviewservice.payload.dto.UserDto;
import com.reviewservice.payload.response.ApiResponse;
import com.reviewservice.service.client.SalonFeignClient;
import com.reviewservice.service.client.UserFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceCB {
    private final UserFeignClient userFeignClient;
    private final SalonFeignClient salonFeignClient;

    // get User Profile
    @Retry(name = "userRetry", fallbackMethod = "userFallback")
    @CircuitBreaker(name = "userCB", fallbackMethod = "userFallback")
    public ApiResponse<UserDto> getUserProfile(String jwt) throws Exception {
        ResponseEntity<ApiResponse<UserDto>> response = userFeignClient.getUserProfile(jwt);
        if(response == null || response.getBody() == null){
            return new ApiResponse<>(false, "User not found", null);
        }
        return response.getBody();
    }

    public ApiResponse<UserDto> userFallback(String jwt, Throwable t) {
        return new ApiResponse<>(false, "User Service Down", null);
    }

    // get user by id
    @Retry(name="userByIdRetry", fallbackMethod = "userByIdFallback")
    @CircuitBreaker(name="userByIdCB", fallbackMethod = "userByIdFallback")
    public ApiResponse<UserDto> getUserById(Long userId) throws Exception{
        ResponseEntity<ApiResponse<UserDto>> response = userFeignClient.getUserById(userId);
        if(response == null || response.getBody() == null){
            return new ApiResponse<>(false, "User not found", null);
        }
        return response.getBody();
    }

    public ApiResponse<UserDto> userByIdFallback(Long userId, Throwable t){
        return new ApiResponse<>(false, "User Service is down. Please try later.", null);
    }

    // get salon by owner id
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

    public ApiResponse<?> salonByIdFallback(Long salonId, Throwable t) {
        System.out.println("Salon fallback triggered: " + t.getMessage());
        return new ApiResponse<>(false, "Salon Service is currently unavailable.", null);
    }


}
