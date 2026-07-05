package com.salonservice.controller;

import com.salonservice.exception.ResourceNotFoundException;
import com.salonservice.mapper.SalonMapper;
import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;
import com.salonservice.payload.dto.UserDto;
import com.salonservice.payload.response.ApiResponse;
import com.salonservice.service.Impl.SalonServiceCB;
import com.salonservice.service.SalonService;
import com.salonservice.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
    private final SalonServiceCB salonServiceCB;

    private UserDto getAuthenticatedUser(String jwt) {
        CompletableFuture<ApiResponse<UserDto>> future =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return salonServiceCB.getUserProfile(jwt);
                    } catch (Exception e) {
                        throw new ResourceNotFoundException("User not found");
                    }
                });

        ApiResponse<UserDto> response = future.join();
        if (!response.isSuccess()) {
            throw new ResourceNotFoundException("User fetch failed");
        }
        if (response.getData() == null || response.getData().getId() == null) {
            throw new ResourceNotFoundException("User not found from JWT");
        }
        return response.getData();
    }

    // http://localhost:5002/api/salons
    // create salon by providing details
    @PostMapping
    public ResponseEntity<ApiResponse<SalonDto>> createSalon(@RequestBody SalonDto salonDto, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = getAuthenticatedUser(jwt);
        Salon salon = salonService.createSalon(salonDto, user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Created Successfully", SalonMapper.mapToDTO(salon)));
    }

    // http://localhost:5002/api/salons/2
    // update salon
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateSalon(@PathVariable("id") Long salonId, @RequestBody SalonDto salonDto, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = getAuthenticatedUser(jwt);
        Salon salon = salonService.updateSalon(salonDto, user, salonId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Updated Successfully", SalonMapper.mapToDTO(salon)));
    }

    // http://localhost:5002/api/salons
    // get all salons
    @GetMapping
    public ResponseEntity<ApiResponse<List<SalonDto>>> getSalons() throws Exception {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDto> salonDtos = salons.stream()
                .map(SalonMapper::mapToDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "All salons fetched", salonDtos));
    }

    @GetMapping("/active")
    // get all salons which are active
    public ResponseEntity<ApiResponse<List<SalonDto>>> getSalonsActive(){
        List<Salon> salons = salonService.getAllSalonsActive();
        List<SalonDto> salonDtos = salons.stream()
                .map(SalonMapper::mapToDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Active salons fetched", salonDtos));
    }

    // http://localhost:5002/api/salons/5
    // get salon by id
    @GetMapping("/{salonId}")
    public ResponseEntity<ApiResponse<SalonDto>> getSalonById(@PathVariable Long salonId) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        SalonDto salonDto = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon fetched successfully by id", salonDto));
    }

    // http://localhost:5002/api/salons/search?city=Mumbai
    // search salon by its city name
    @GetMapping("/search")
    public ResponseEntity<List<SalonDto>> searchSalons(@RequestParam("city") String city) throws Exception {
        List<Salon> salons = salonService.searchSalonByCity(city);
        List<SalonDto> salonDtos = salons.stream().map(SalonMapper::mapToDTO).toList();

        return ResponseEntity.ok(salonDtos);
    }

    // http://localhost:5002/api/salons/owner
    // get all salons who owns it
    @GetMapping("/owner")
    public ResponseEntity<ApiResponse<List<SalonDto>>> getSalonByOwnerId(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = getAuthenticatedUser(jwt);

        List<SalonDto> salons = salonService.getSalonByOwnerId(user.getId()).stream()
                .map(SalonMapper::mapToDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Owner fetched", salons));
    }

    @GetMapping("/others")
    public ResponseEntity<ApiResponse<List<SalonDto>>> getOtherSalons(@RequestHeader("Authorization") String jwt){
        UserDto user = getAuthenticatedUser(jwt);
        Long ownerId = user.getId();
        CompletableFuture<List<SalonDto>> salonFuture =
                CompletableFuture.supplyAsync(()->
                    salonService.getAllSalons().stream()
                            .filter(salon -> !salon.getOwnerId().equals(ownerId))
                            .map(SalonMapper::mapToDTO)
                            .toList()
                );
        List<SalonDto> salons = salonFuture.join();
        return ResponseEntity.ok(new ApiResponse<>(true, "Other salons fetched", salons));
    }


    // delete salon by id
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteSalon(@PathVariable("id") Long salonId, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = getAuthenticatedUser(jwt);
        salonService.deleteSalon(salonId, user.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon deleted successfully", null));
    }

    // toggle the status of salon - (Active/InActive)
    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<SalonDto>> toggleSalonStatus(@PathVariable("id") Long salonId, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = getAuthenticatedUser(jwt);
        Salon salon = salonService.toggleSalonStatus(salonId, user.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon status updated", SalonMapper.mapToDTO(salon)));
    }

}
