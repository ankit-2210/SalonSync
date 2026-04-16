package com.bookingservice.service.client;

import com.bookingservice.payload.dto.UserDto;
import com.bookingservice.payload.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("UserService")
public interface UserFeignClient {
    @GetMapping("/api/users/{userId}")
    ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable("userId") Long id) throws Exception;

    @GetMapping("/api/users/profile")
    ResponseEntity<ApiResponse<UserDto>> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception;

}
