package com.bookingservice.message;

import com.bookingservice.model.Booking;
import com.bookingservice.model.PaymentOrder;
import com.bookingservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingEventConsumer {
    private final BookingService bookingService;

    @RabbitListener(queues = "booking-queue")
    public void bookingUpdateListener(PaymentOrder paymentOrder) throws Exception {
        try {
            System.out.println("Received booking event: " + paymentOrder.getId());
            bookingService.bookingSuccess(paymentOrder);
        }
        catch (Exception e) {
            System.err.println("Booking error: " + e.getMessage());
            throw e;
        }
    }

}
