package com.notificationservice.controller;

import com.notificationservice.mapper.NotificationMapper;
import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.dto.NotificationDto;
import com.notificationservice.service.Impl.NotificationServiceCB;
import com.notificationservice.service.NotificationService;
import com.notificationservice.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications/salon-owner")
public class SalonNotificationController {
    private final NotificationService notificationService;
    private final NotificationServiceCB notificationServiceCB;

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<NotificationDto>> getNotificationBySalonId(@PathVariable Long salonId){
        List<Notification> notifications = notificationService.getAllNotificationBySalonId(salonId);
        List<NotificationDto> notificationDtos = notifications.stream().map(notification -> {
            try {
                BookingDto bookingDto = notificationServiceCB.getBookingById(notification.getBookingId()).getData();
                return NotificationMapper.mapToDto(notification, bookingDto);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        return ResponseEntity.ok(notificationDtos);
    }

}
