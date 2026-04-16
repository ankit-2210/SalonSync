package com.offeringservice.controller;

import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.response.ApiResponse;
import com.offeringservice.service.OfferingServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/offeringService")
@RequiredArgsConstructor
public class OfferingServiceController {
    private final OfferingServicesService offeringServicesService;

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<Set<OfferingService>>> getServicesBySalonId(@PathVariable Long salonId, @RequestParam(required = false) Long categoryId){
        Set<OfferingService> offeringServices = offeringServicesService.getAllServiceBySalonId(salonId, categoryId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully", offeringServices));
    }

    @GetMapping("/salon/{salonId}/category/{categoryId}")
    public ResponseEntity<ApiResponse<Set<OfferingService>>> getServicesBySalonAndCategory(@PathVariable Long salonId, @PathVariable Long categoryId) {
        Set<OfferingService> offeringServices = offeringServicesService.getAllServiceBySalonId(salonId, categoryId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully", offeringServices));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OfferingService>> getServiceById(@PathVariable Long id) throws Exception{
        OfferingService offeringService = offeringServicesService.getServiceById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully by id", offeringService));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<Set<OfferingService>>> getServicesByIds(@RequestParam Set<Long> ids){
        Set<OfferingService> offeringServices = offeringServicesService.getServicesById(ids);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetched successfully by ids", offeringServices));
    }


}
