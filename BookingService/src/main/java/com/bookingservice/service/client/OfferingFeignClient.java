package com.bookingservice.service.client;

import com.bookingservice.payload.dto.ServiceDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Set;

@FeignClient("OfferingService")
public interface OfferingFeignClient {

    @GetMapping("/api/offeringService/list")
    ResponseEntity<Set<ServiceDto>> getServicesByIds(@RequestParam Set<Long> ids);


}
