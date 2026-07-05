package com.paymentservice.message;

import com.paymentservice.payload.dto.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NotificationEventProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sentNotification(Long bookingId, Long userId, Long salonId){
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setBookingId(bookingId);
        notificationDto.setUserId(userId);
        notificationDto.setSalonId(salonId);
        notificationDto.setDescription("New Booking Got Confirmed");
        notificationDto.setType("BOOKING");
        notificationDto.setCreatedAt(LocalDateTime.now());

        System.out.println("Sending notification for booking: " + bookingId);
        rabbitTemplate.convertAndSend("notification-exchange", "notification.routing.key", notificationDto);
    }

}
