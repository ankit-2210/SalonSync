package com.offeringservice.service.Impl;

import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.UserDto;
import com.offeringservice.payload.response.ApiResponse;
import com.offeringservice.service.client.CategoryFeignClient;
import com.offeringservice.service.client.SalonFeignClient;
import com.offeringservice.service.client.UserFeignClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferingServicesServiceCB {
    private final UserFeignClient userFeignClient;
    private final SalonFeignClient salonFeignClient;
    private final CategoryFeignClient categoryFeignClient;

    @CircuitBreaker(name = "salonCB", fallbackMethod = "salonOwnerFallback")
    public ApiResponse<List<SalonDto>> getSalonByOwnerId(String jwt) throws Exception {
        ResponseEntity<ApiResponse<List<SalonDto>>> response = salonFeignClient.getSalonByOwnerId(jwt);
        if (response == null || response.getBody() == null) {
            return new ApiResponse<>(false, "Salon Service returned empty response", null);
        }
        return response.getBody();
    }
    public ApiResponse<List<SalonDto>> salonOwnerFallback(String jwt, Throwable t) {
        return new ApiResponse<>(false, "Salon Service (Owner) is down", null);
    }

    @CircuitBreaker(name="categoryDB", fallbackMethod = "categoryFallback")
    public ApiResponse<CategoryDto> getCategoryByIdAndSalonId(Long categoryId, Long salonId) throws Exception {
        ResponseEntity<ApiResponse<CategoryDto>> categoryDtoResponseEntity = categoryFeignClient.getCategoryByIdAndSalonId(categoryId, salonId);
        if (categoryDtoResponseEntity == null || categoryDtoResponseEntity.getBody() == null) {
            return new ApiResponse<>(false, "Category Service unavailable", null);
        }
        return categoryDtoResponseEntity.getBody();
    }
    public ApiResponse<CategoryDto> categoryFallback(Long categoryId, Long salonId, Throwable t) {
        return new ApiResponse<>(false, "Category Service is down", null);
    }


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

    @CircuitBreaker(name="userCB", fallbackMethod = "userByIdFallback")
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
