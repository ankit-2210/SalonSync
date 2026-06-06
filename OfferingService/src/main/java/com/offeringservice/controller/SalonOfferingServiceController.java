package com.offeringservice.controller;

import com.offeringservice.exception.ResourceNotFoundException;
import com.offeringservice.mapper.ServiceMapper;
import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.ServiceDto;
import com.offeringservice.payload.response.ApiResponse;
import com.offeringservice.payload.response.CategoryResponse;
import com.offeringservice.payload.response.ServiceResponse;
import com.offeringservice.service.Impl.OfferingServicesServiceCB;
import com.offeringservice.service.OfferingServicesService;
import com.offeringservice.service.client.CategoryFeignClient;
import com.offeringservice.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/offeringService/salon-owner")
public class SalonOfferingServiceController {
    private final OfferingServicesService offeringServicesService;
    private final OfferingServicesServiceCB offeringServicesServiceCB;
    private final ServiceMapper serviceMapper;

    // create service
    @PostMapping
    public ResponseEntity<ApiResponse<ServiceResponse>> createService(@RequestBody ServiceDto serviceDto, @RequestHeader("Authorization") String jwt) throws Exception {
        CompletableFuture<ApiResponse<List<SalonDto>>> salonFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return offeringServicesServiceCB.getSalonByOwnerId(jwt);
                    } catch (Exception e) {
                        throw new ResourceNotFoundException("Owner salons not found");
                    }
                });
        ApiResponse<List<SalonDto>> salonResponse = salonFuture.join();
        if (!salonResponse.isSuccess() || salonResponse.getData() == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, salonResponse.getMessage(), null));
        }

        SalonDto salonDto = salonResponse.getData().stream()
                .filter(s -> s.getId().equals(serviceDto.getSalonId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Salon does not belong to owner"));

        CompletableFuture<ApiResponse<CategoryResponse>> categoryFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return offeringServicesServiceCB.getCategoryByIdAndSalonId(serviceDto.getCategoryId(), salonDto.getId());
                    } catch (Exception e) {
                        throw new ResourceNotFoundException("Category not found");
                    }
                });
        ApiResponse<CategoryResponse> categoryResponse = categoryFuture.join();
        if (!categoryResponse.isSuccess() || categoryResponse.getData() == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, categoryResponse.getMessage(), null));
        }


        OfferingService offeringService = offeringServicesService.createService(salonDto, serviceDto, categoryResponse.getData().getCategoryDto());
        ServiceResponse response = serviceMapper.toResponse(offeringService, categoryResponse.getData());
        return ResponseEntity.ok(new ApiResponse<>(true, "Service created successfully", response));
    }

    // update service
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceResponse>> updateService(@PathVariable Long id, @RequestBody ServiceDto serviceDto) throws Exception {
        OfferingService offeringServices = offeringServicesService.updateService(id, serviceDto);
        ApiResponse<CategoryResponse> categoryResponse = offeringServicesServiceCB.getCategoryById(offeringServices.getCategoryId());

        ServiceResponse response = serviceMapper.toResponse(offeringServices, categoryResponse.getData());
        return ResponseEntity.ok(new ApiResponse<>(true, "Service updated successfully", response));
    }

    // delete service by id
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceResponse>> deleteService(@PathVariable Long id) throws Exception {
        offeringServicesService.deleteService(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Service deleted successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getOwnerService(@RequestHeader("Authorization") String jwt) throws Exception {
        CompletableFuture<ApiResponse<List<SalonDto>>> salonFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return offeringServicesServiceCB.getSalonByOwnerId(jwt);
                    } catch (Exception e) {
                        throw new ResourceNotFoundException("Owner salons not found");
                    }
                });
        ApiResponse<List<SalonDto>> salonResponse = salonFuture.join();
        if (!salonResponse.isSuccess() || salonResponse.getData() == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, salonResponse.getMessage(), null));
        }

        Set<Long> salonIds = salonResponse.getData().stream()
                .map(SalonDto::getId)
                .collect(Collectors.toSet());
        Set<OfferingService> services = offeringServicesService.getServicesBySalons(salonIds);

        List<ServiceResponse> responses = services.stream()
                .map(service ->{
                    try{
                        ApiResponse<CategoryResponse> categoryResponse = offeringServicesServiceCB.getCategoryById(service.getCategoryId());
                        if (!categoryResponse.isSuccess() || categoryResponse.getData() == null) {
                            return null;
                        }
                        return serviceMapper.toResponse(service, categoryResponse.getData());
                    }
                    catch(Exception e){
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(true, "Owner services fetched successfully", responses));
    }




}