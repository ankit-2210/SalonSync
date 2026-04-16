package com.paymentservice.service.client;

import com.paymentservice.payload.dto.SalonDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient("SalonService")
public interface SalonFeignClient {
    @GetMapping("/api/salons/owner")
    ResponseEntity<List<SalonDto>> getSalonByOwnerId(@RequestHeader("Authorization") String jwt) throws Exception;

    @GetMapping("/api/salons/{salonId}")
    ResponseEntity<SalonDto> getSalonById(@PathVariable Long salonId) throws Exception;
}
