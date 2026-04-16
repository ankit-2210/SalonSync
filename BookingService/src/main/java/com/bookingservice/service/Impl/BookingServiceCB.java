package com.bookingservice.service.Impl;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.payload.dto.SalonDto;
import com.bookingservice.payload.dto.ServiceDto;
import com.bookingservice.payload.dto.UserDto;
import com.bookingservice.payload.response.ApiResponse;
import com.bookingservice.payload.response.PaymentLinkResponse;
import com.bookingservice.service.client.OfferingFeignClient;
import com.bookingservice.service.client.PaymentFeignClient;
import com.bookingservice.service.client.SalonFeignClient;
import com.bookingservice.service.client.UserFeignClient;
import com.bookingservice.utils.PaymentMethod;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingServiceCB {
    private final SalonFeignClient salonFeignClient;
    private final UserFeignClient userFeignClient;
    private final OfferingFeignClient offeringFeignClient;
    private final PaymentFeignClient paymentFeignClient;

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

    @Retry(name = "offeringRetry", fallbackMethod = "offeringFallback")
    @CircuitBreaker(name = "offeringCB", fallbackMethod = "offeringFallback")
    public ApiResponse<Set<ServiceDto>> getServicesByIds(Set<Long> ids) {
         ResponseEntity<Set<ServiceDto>> response = offeringFeignClient.getServicesByIds(ids);
        if (response == null || response.getBody() == null || response.getBody().isEmpty()) {
            return new ApiResponse<>(false, "Services not found", null);
        }
        return new ApiResponse<>(true, "Services fetched", response.getBody());
    }
    public ApiResponse<Set<ServiceDto>> offeringFallback(Set<Long> ids, Throwable t) {
        return new ApiResponse<>(false, "Offering Service Down", null);
    }

    @CircuitBreaker(name = "paymentCB", fallbackMethod = "paymentFallback")
    public ApiResponse<PaymentLinkResponse> createPaymentLink(BookingDto bookingDto, PaymentMethod method, String jwt) throws Exception {
        ResponseEntity<PaymentLinkResponse> response = paymentFeignClient.createPaymentLink(bookingDto, method, jwt);
        if(response == null || response.getBody() == null){
            return new ApiResponse<>(false, "Payment failed", null);
        }
        return new ApiResponse<>(true, "Payment Created", response.getBody());
    }
    public ApiResponse<PaymentLinkResponse> paymentFallback(BookingDto bookingDto, PaymentMethod method, String jwt, Throwable t) {
        return new ApiResponse<>(false, "Payment Service Down", null);
    }

    @Retry(name = "salonRetry", fallbackMethod = "salonFallback")
    @CircuitBreaker(name = "salonCB", fallbackMethod = "salonFallback")
    public ApiResponse<SalonDto> getSalonById(Long salonId) throws Exception {
        ResponseEntity<ApiResponse<SalonDto>> response = salonFeignClient.getSalonById(salonId);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Salon not found", null);
        }
        return response.getBody();
    }
    public ApiResponse<SalonDto> salonFallback(Long salonId, Throwable t) {
        return new ApiResponse<>(false, "Salon Service Down", null);
    }

    @Retry(name = "salonRetry", fallbackMethod = "salonOwnerFallback")
    @CircuitBreaker(name = "salonCB", fallbackMethod = "salonOwnerFallback")
    public ApiResponse<List<SalonDto>> getSalonByOwnerId(String jwt) throws Exception {
        ResponseEntity<ApiResponse<List<SalonDto>>> response = salonFeignClient.getSalonByOwnerId(jwt);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Salon Service unavailable or no salons found", null);
        }
        return response.getBody();
    }
    public ApiResponse<List<SalonDto>> salonOwnerFallback(String jwt, Throwable t) {
        return new ApiResponse<>(false, "Salon Service (Owner) is down", null);
    }

}
