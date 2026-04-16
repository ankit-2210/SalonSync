package com.offeringservice.controller;

import com.offeringservice.mapper.ServiceMapper;
import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.ServiceDto;
import com.offeringservice.payload.response.ApiResponse;
import com.offeringservice.service.OfferingServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.offeringservice.mapper.ServiceMapper.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/offeringService")
@RequiredArgsConstructor
public class OfferingServiceController {
    private final OfferingServicesService offeringServicesService;
    private final ServiceMapper serviceMapper;

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<Set<ServiceDto>>> getServicesBySalonId(@PathVariable Long salonId, @RequestParam(required = false) Long categoryId){
        Set<ServiceDto> services = serviceMapper.mapToDtoSet(offeringServicesService.getAllServiceBySalonId(salonId, categoryId));
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully", services));
    }

    @GetMapping("/salon/{salonId}/category/{categoryId}")
    public ResponseEntity<ApiResponse<Set<ServiceDto>>> getServicesBySalonAndCategory(@PathVariable Long salonId, @PathVariable Long categoryId) {
        Set<ServiceDto> offeringServices = serviceMapper.mapToDtoSet(offeringServicesService.getAllServiceBySalonId(salonId, categoryId));
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully", offeringServices));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceDto>> getServiceById(@PathVariable Long id) throws Exception{
        OfferingService offeringService = offeringServicesService.getServiceById(id);
        ServiceDto serviceDto = serviceMapper.mapToDto(offeringService);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully by id", serviceDto));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<Set<ServiceDto>>> getServicesByIds(@RequestParam Set<Long> ids){
        Set<ServiceDto> offeringServices = serviceMapper.mapToDtoSet(offeringServicesService.getServicesById(ids));
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetched successfully by ids", offeringServices));
    }

}
