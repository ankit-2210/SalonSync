package com.paymentservice.service;

import com.paymentservice.model.PaymentOrder;
import com.paymentservice.payload.dto.BookingDto;
import com.paymentservice.payload.dto.UserDto;
import com.paymentservice.payload.response.PaymentLinkResponse;
import com.paymentservice.utils.PaymentMethod;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {
    PaymentLinkResponse createOrder(UserDto userDto, BookingDto bookingDto, PaymentMethod paymentMethod) throws RazorpayException, StripeException;

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId);

    PaymentLink createRazorpayPaymentLink(UserDto userDto, Long amount, Long orderId) throws RazorpayException;

    String createStripePaymentLink(UserDto userDto, Long amount, Long orderId) throws StripeException;

    Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;
}
