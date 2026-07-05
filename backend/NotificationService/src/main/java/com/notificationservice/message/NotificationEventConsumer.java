package com.notificationservice.message;

import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.NotificationDto;
import com.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class NotificationEventConsumer {
    private final NotificationService notificationService;

    @RabbitListener(queues = "notification-queue")
    public void consumeNotification(Notification notification) throws Exception {
        try {
            System.out.println("Received notification for booking: " + notification.getBookingId());
            notificationService.createNotification(notification);
        }
        catch (Exception e) {
            System.err.println("Notification error: " + e.getMessage());
            throw e;
        }
    }
}
