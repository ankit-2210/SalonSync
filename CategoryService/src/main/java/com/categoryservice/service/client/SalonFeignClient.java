package com.categoryservice.service.client;

import com.categoryservice.config.FeignConfig;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name="SalonService", configuration = FeignConfig.class)
public interface SalonFeignClient {
    @GetMapping("/api/salons/owner")
    ResponseEntity<ApiResponse<List<SalonDto>>> getSalonByOwnerId(@RequestHeader("Authorization") String jwt) throws Exception;

    @GetMapping("/api/salons/{salonId}")
    ResponseEntity<ApiResponse<SalonDto>> getSalonById(@PathVariable Long salonId) throws Exception;
}
