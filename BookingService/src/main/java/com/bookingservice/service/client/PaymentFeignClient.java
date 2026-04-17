package com.bookingservice.service.client;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.payload.response.ApiResponse;
import com.bookingservice.payload.response.PaymentLinkResponse;
import com.bookingservice.utils.PaymentMethod;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("PaymentService")
public interface PaymentFeignClient {
    @PostMapping("/api/payments/create")
    ResponseEntity<ApiResponse<PaymentLinkResponse>> createPaymentLink(@RequestBody BookingDto bookingDto, @RequestParam("paymentMethod") PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt);
}
