package com.paymentservice.service.Impl;

import com.paymentservice.message.BookingEventProducer;
import com.paymentservice.message.NotificationEventProducer;
import com.paymentservice.model.PaymentOrder;
import com.paymentservice.payload.dto.BookingDto;
import com.paymentservice.payload.dto.UserDto;
import com.paymentservice.payload.response.PaymentLinkResponse;
import com.paymentservice.repository.PaymentOrderRepository;
import com.paymentservice.service.PaymentService;
import com.paymentservice.utils.PaymentMethod;
import com.paymentservice.utils.PaymentOrderStatus;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.*;
import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final BookingEventProducer bookingEventProducer;
    private final NotificationEventProducer notificationEventProducer;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpaySecretApi;

    @Override
    public PaymentLinkResponse createOrder(UserDto userDto, BookingDto bookingDto, PaymentMethod paymentMethod) throws RazorpayException, StripeException {
        Long amount = (long)bookingDto.getTotalPrice();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUserId(userDto.getId());
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setBookingId(bookingDto.getId());
        paymentOrder.setSalonId(bookingDto.getSalonId());
        PaymentOrder order = paymentOrderRepository.save(paymentOrder);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentLink paymentLink=createRazorpayPaymentLink(userDto, order.getAmount(), order.getId());
            String url = paymentLink.get("short_url");
            String id = paymentLink.get("id");

            paymentLinkResponse.setPaymentLinkUrl(url);
            paymentLinkResponse.setPaymentLinkId(id);
            order.setPaymentLinkId(id);
            paymentOrderRepository.save(order);
        }
        else{
            String paymentUrl = createStripePaymentLink(userDto, order.getAmount(), order.getId());
            paymentLinkResponse.setPaymentLinkUrl(paymentUrl);
        }
        return paymentLinkResponse;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findById(id).orElse(null);
        if(paymentOrder == null){
            throw new Exception("Payment Order not found!!");
        }
        return paymentOrder;
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) {
        return paymentOrderRepository.findByPaymentLinkId(paymentId);
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(UserDto userDto, Long amount, Long orderId) throws RazorpayException {
        Long price = amount*100;
        RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpaySecretApi);
        JSONObject jsonObjectPaymentLink = new JSONObject();
        jsonObjectPaymentLink.put("amount", price);
        jsonObjectPaymentLink.put("currency", "INR");

        JSONObject jsonObjectCustomer = new JSONObject();
        jsonObjectCustomer.put("name", userDto.getFullName());
        jsonObjectCustomer.put("email", userDto.getEmail());

        jsonObjectPaymentLink.put("customer", jsonObjectCustomer);

        JSONObject jsonObjectNotify = new JSONObject();
        jsonObjectNotify.put("email", true);

        jsonObjectPaymentLink.put("notify", jsonObjectNotify);

        jsonObjectPaymentLink.put("reminder_enable", true);
        jsonObjectPaymentLink.put("callback_url", "http://localhost:3000/payment-success/"+orderId);
        jsonObjectPaymentLink.put("callback_method", "get");

        PaymentLink paymentLink=razorpayClient.paymentLink.create(jsonObjectPaymentLink);
        return paymentLink;
    }

    @Override
    public String createStripePaymentLink(UserDto userDto, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams sessionCreateParams = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-success/"+orderId)
                .setCancelUrl("http://localhost:3000/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Salon Appointment Booking").build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(sessionCreateParams);
        return session.getUrl();
    }

    @Override
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if(paymentOrder.getPaymentOrderStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpaySecretApi);
                Payment payment = razorpayClient.payments.fetch(paymentId);
                Integer amount = payment.get("amount");
                String status = payment.get("status");
                System.out.println(amount + " " + status);
                if (status.equals("captured")) {
                    // product rabbitMQ event
                    bookingEventProducer.sentBookingUpdateEvent(paymentOrder);
                    notificationEventProducer.sentNotification(paymentOrder.getBookingId(), paymentOrder.getUserId(), paymentOrder.getSalonId());

                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                }
                return false;
            }
            else {
                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
        }

        return false;
    }
    
}
