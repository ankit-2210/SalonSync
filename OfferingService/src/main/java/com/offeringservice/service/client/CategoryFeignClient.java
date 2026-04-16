package com.offeringservice.service.client;

import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("CategoryService")
public interface CategoryFeignClient {
    @GetMapping("/api/categories/{id}")
    ResponseEntity<ApiResponse<?>> getCategoryById(@PathVariable Long id) throws Exception;

    @GetMapping("/api/categories/salon-owner/category/{id}/salon/{salonId}")
    ResponseEntity<ApiResponse<CategoryDto>> getCategoryByIdAndSalonId(@PathVariable Long id, @PathVariable Long salonId) throws Exception;
}
