package com.paymentservice.message;

import com.paymentservice.model.PaymentOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingEventProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sentBookingUpdateEvent(PaymentOrder paymentOrder){
        System.out.println("Sending booking event: " + paymentOrder.getId());
        rabbitTemplate.convertAndSend("booking-exchange", "booking.routing.key", paymentOrder);
    }

}
