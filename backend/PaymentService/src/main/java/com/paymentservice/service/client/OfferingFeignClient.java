package com.paymentservice.service.client;

import com.paymentservice.payload.dto.ServiceDto;
import com.paymentservice.payload.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Set;

@FeignClient("OfferingService")
public interface OfferingFeignClient {

    @GetMapping("/api/offeringService/list")
    ResponseEntity<ApiResponse<Set<ServiceDto>>> getServicesByIds(@RequestParam Set<Long> ids);


}
