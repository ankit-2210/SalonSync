package com.offeringservice.controller;

import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.ServiceDto;
import com.offeringservice.payload.response.ApiResponse;
import com.offeringservice.service.Impl.OfferingServicesServiceCB;
import com.offeringservice.service.OfferingServicesService;
import com.offeringservice.service.client.CategoryFeignClient;
import com.offeringservice.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/offeringService/salon-owner")
public class SalonOfferingServiceController {
    private final OfferingServicesService offeringServicesService;
    private final OfferingServicesServiceCB offeringServicesServiceCB;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createService(@RequestBody ServiceDto serviceDto, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<List<SalonDto>> salonDtos = offeringServicesServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess() || salonDtos.getData() == null){
            return ResponseEntity.ok(salonDtos);
        }

        SalonDto salonDto = salonDtos.getData().stream().filter(s->s.getId().equals(serviceDto.getSalonId()))
                .findFirst().orElseThrow(()-> new RuntimeException("Salon not found with given ID: " + serviceDto.getSalonId()));
        ApiResponse<CategoryDto> categoryDto = offeringServicesServiceCB.getCategoryByIdAndSalonId(serviceDto.getCategoryId(), salonDto.getId());
        if(!categoryDto.isSuccess() || categoryDto.getData() == null){
            return ResponseEntity.ok(categoryDto);
        }

        OfferingService offeringService = offeringServicesService.createService(salonDto, serviceDto, categoryDto.getData());
        return ResponseEntity.ok(new ApiResponse<>(true, "Service created successfully", offeringService));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfferingService> updateService(@PathVariable Long id, @RequestBody OfferingService offeringService) throws Exception {
        OfferingService offeringServices = offeringServicesService.updateService(id, offeringService);
        return ResponseEntity.ok(offeringServices);
    }

}
