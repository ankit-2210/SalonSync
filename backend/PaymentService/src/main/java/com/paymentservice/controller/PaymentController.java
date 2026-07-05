package com.paymentservice.controller;

import com.paymentservice.model.PaymentOrder;
import com.paymentservice.payload.dto.BookingDto;
import com.paymentservice.payload.dto.UserDto;
import com.paymentservice.payload.response.ApiResponse;
import com.paymentservice.payload.response.PaymentLinkResponse;
import com.paymentservice.service.Impl.PaymentServiceCB;
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
    private final PaymentServiceCB paymentServiceCB;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<PaymentLinkResponse>> createPaymentLink(@RequestBody BookingDto bookingDto, @RequestParam("paymentMethod") PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = paymentServiceCB.getUserProfile(jwt).getData();
        System.out.println(paymentMethod);
        PaymentLinkResponse paymentLinkResponse = paymentService.createOrder(userDto, bookingDto, paymentMethod);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment Created", paymentLinkResponse));
    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<ApiResponse<PaymentOrder>> getPaymentOrderById(@PathVariable Long paymentOrderId) throws Exception {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment fetch by id", paymentOrder));
    }

    @PatchMapping("/proceed")
    public ResponseEntity<ApiResponse<Boolean>> proceedPayment(@RequestParam String paymentId, @RequestParam String paymentLinkId) throws RazorpayException {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        Boolean res = paymentService.proceedPayment(paymentOrder, paymentId, paymentLinkId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment Proceed", res));
    }


}
