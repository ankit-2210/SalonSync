package com.notificationservice.service.client;

import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("BookingService")
public interface BookingFeignClient {

    @GetMapping("/api/bookings/{bookingId}")
    ResponseEntity<ApiResponse<BookingDto>> getBookingById(@PathVariable("bookingId") Long bookingId);

}
