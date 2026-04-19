package com.notificationservice.service.Impl;

import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.dto.UserDto;
import com.notificationservice.payload.response.ApiResponse;
import com.notificationservice.service.client.BookingFeignClient;
import com.notificationservice.service.client.UserFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@RequiredArgsConstructor
public class NotificationServiceCB {
    private final BookingFeignClient bookingFeignClient;
    private final UserFeignClient userFeignClient;

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


    @Retry(name = "bookingRetry", fallbackMethod = "bookingFallback")
    @CircuitBreaker(name = "bookingCB", fallbackMethod = "bookingFallback")
    public ApiResponse<BookingDto> getBookingById(Long bookingId) throws Exception {
        ResponseEntity<ApiResponse<BookingDto>> response = bookingFeignClient.getBookingById(bookingId);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Booking not found", null);
        }
        return response.getBody();
    }

    public ApiResponse<BookingDto> bookingFallback(Long bookingId, Throwable t) {
        return new ApiResponse<>(false, "Booking Service Down", null);
    }


}
