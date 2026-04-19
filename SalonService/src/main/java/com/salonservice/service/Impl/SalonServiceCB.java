package com.salonservice.service.Impl;

import com.salonservice.payload.dto.UserDto;
import com.salonservice.payload.response.ApiResponse;
import com.salonservice.service.client.UserFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SalonServiceCB {
    private final UserFeignClient userFeignClient;

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

}
