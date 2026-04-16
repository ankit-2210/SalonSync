package com.salonservice.controller;

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

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
    private final SalonServiceCB salonServiceCB;

    // http://localhost:5002/api/salons
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createSalon(@RequestBody SalonDto salonDto, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<UserDto> userDto = salonServiceCB.getUserProfile(jwt);
        if(!userDto.isSuccess()){
            return ResponseEntity.ok(userDto);
        }
        if(userDto.getData().getId() == null){
            return ResponseEntity.ok(new ApiResponse<>(false, "User not found from jwt!!", null));
        }

        Salon salon = salonService.createSalon(salonDto, userDto.getData());
        SalonDto salonDto1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Created Successfully", salonDto1));
    }

    // http://localhost:5002/api/salons/2
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateSalon(@PathVariable("id") Long salonId, @RequestBody SalonDto salonDto, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<UserDto> userDto = salonServiceCB.getUserProfile(jwt);
        if(!userDto.isSuccess()){
            return ResponseEntity.ok(userDto);
        }
        if(userDto.getData().getId() == null){
            return ResponseEntity.ok(new ApiResponse<>(false, "User not found from jwt!!", null));
        }

        Salon salon = salonService.updateSalon(salonDto, userDto.getData(), salonId);
        SalonDto salonDto1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Updated Successfully", salonDto1));
    }

    // http://localhost:5002/api/salons
    @GetMapping
    public ResponseEntity<ApiResponse<List<SalonDto>>> getSalons() throws Exception {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDto> salonDtos = salons.stream().map(SalonMapper::mapToDTO).toList();

        return ResponseEntity.ok(new ApiResponse<>(true, "All salons fetched", salonDtos));
    }

    // http://localhost:5002/api/salons/5
    @GetMapping("/{salonId}")
    public ResponseEntity<ApiResponse<SalonDto>> getSalonById(@PathVariable Long salonId) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        SalonDto salonDto = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon fetched successfully by id", salonDto));
    }

    // http://localhost:5002/api/salons/search?city=Mumbai
    @GetMapping("/search")
    public ResponseEntity<List<SalonDto>> searchSalons(@RequestParam("city") String city) throws Exception {
        List<Salon> salons = salonService.searchSalonByCity(city);
        List<SalonDto> salonDtos = salons.stream().map(SalonMapper::mapToDTO).toList();

        return ResponseEntity.ok(salonDtos);
    }

    // http://localhost:5002/api/salons/owner
    @GetMapping("/owner")
    public ResponseEntity<ApiResponse<List<SalonDto>>> getSalonByOwnerId(@RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<UserDto> userDto = salonServiceCB.getUserProfile(jwt);
        if (!userDto.isSuccess()) {
            return ResponseEntity.ok(new ApiResponse<>(false, "User fetch failed", null));
        }
        if(userDto.getData().getId() == null){
            return ResponseEntity.ok(new ApiResponse<>(false, "User not found from jwt!!", null));
        }

        List<Salon> salons = salonService.getSalonByOwnerId(userDto.getData().getId());
        List<SalonDto> salonDtos = salons.stream().map(SalonMapper::mapToDTO).toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon Owner fetched", salonDtos));
    }

}
