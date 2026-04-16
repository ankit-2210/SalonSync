package com.paymentservice.controller;

import com.paymentservice.model.PaymentOrder;
import com.paymentservice.payload.dto.BookingDto;
import com.paymentservice.payload.dto.UserDto;
import com.paymentservice.payload.response.PaymentLinkResponse;
import com.paymentservice.service.PaymentService;
import com.paymentservice.service.client.UserFeignClient;
import com.paymentservice.utils.PaymentMethod;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final UserFeignClient userFeignClient;

    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@RequestBody BookingDto bookingDto, @RequestParam PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userFeignClient.getUserProfile(jwt).getBody();

        PaymentLinkResponse paymentLinkResponse = paymentService.createOrder(userDto, bookingDto, paymentMethod);
        return ResponseEntity.ok(paymentLinkResponse);
    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(@PathVariable Long paymentOrderId) throws Exception {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);
        return ResponseEntity.ok(paymentOrder);
    }

    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(@RequestParam String paymentId, @RequestParam String paymentLinkId) throws RazorpayException {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        Boolean res = paymentService.proceedPayment(paymentOrder, paymentId, paymentLinkId);
        return ResponseEntity.ok(res);
    }


}
