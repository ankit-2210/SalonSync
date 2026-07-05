package com.offeringservice.controller;

import com.offeringservice.exception.ResourceNotFoundException;
import com.offeringservice.mapper.ServiceMapper;
import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.ServiceDto;
import com.offeringservice.payload.response.*;
import com.offeringservice.service.Impl.OfferingServicesServiceCB;
import com.offeringservice.service.OfferingServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.offeringservice.mapper.ServiceMapper.*;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/offeringService")
@RequiredArgsConstructor
public class OfferingServiceController {
    private final OfferingServicesService offeringServicesService;
    private final OfferingServicesServiceCB offeringServicesServiceCB;
    private final ServiceMapper serviceMapper;

    private ServiceResponse buildServiceResponse(OfferingService offeringService){
        CategoryResponse categoryResponse =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        ApiResponse<CategoryResponse> response = offeringServicesServiceCB.getCategoryById(offeringService.getCategoryId());
                        if (!response.isSuccess() || response.getData() == null) {
                            throw new ResourceNotFoundException("Category not found");
                        }
                        return response.getData();
                    }
                    catch (Exception e) {
                        throw new ResourceNotFoundException("Category fetch failed");
                    }
                }).join();

        return serviceMapper.toResponse(offeringService, categoryResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceResponse>> getServiceById(@PathVariable Long id) throws Exception{
        OfferingService offeringService = offeringServicesService.getServiceById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully by id", buildServiceResponse(offeringService)));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServicesByIds(@RequestParam Set<Long> ids){
        List<ServiceResponse> responses =
                offeringServicesService.getServicesById(ids).stream()
                        .map(this::buildServiceResponse)
                        .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetched successfully by ids", responses));
    }


    @GetMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServicesBySalonId(@PathVariable Long salonId, @RequestParam(required = false) Long categoryId){
        List<ServiceResponse> responses =
                offeringServicesService.getAllServiceBySalonId(salonId, categoryId).stream()
                        .map(this::buildServiceResponse)
                        .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetch successfully", responses));
    }

    @GetMapping("/salon/{salonId}/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServicesBySalonAndCategory(@PathVariable Long salonId, @PathVariable Long categoryId){
        List<ServiceResponse> responses =
                offeringServicesService
                        .getAllServiceBySalonId(salonId, categoryId).stream()
                        .map(this::buildServiceResponse)
                        .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetched successfully", responses));
    }


}
