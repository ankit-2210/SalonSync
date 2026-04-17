package com.notificationservice.controller;

import com.notificationservice.mapper.NotificationMapper;
import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.dto.NotificationDto;
import com.notificationservice.payload.response.ApiResponse;
import com.notificationservice.service.Impl.NotificationServiceCB;
import com.notificationservice.service.NotificationService;
import com.notificationservice.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final NotificationServiceCB notificationServiceCB;

    @PostMapping
    public ResponseEntity<NotificationDto> createNotification(@RequestBody Notification notification) throws Exception {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDto>> getNotificationByUserId(@PathVariable Long userId){
        List<Notification> notifications = notificationService.getAllNotificationByUserId(userId);

        List<NotificationDto> notificationDtos = notifications.stream().map(notification -> {
            try {
                ApiResponse<BookingDto> response = notificationServiceCB.getBookingById(notification.getBookingId());
                if (!response.isSuccess() || response.getData() == null) {
                    throw new RuntimeException("Booking fetch failed");
                }
                BookingDto bookingDto = response.getData();
                return NotificationMapper.mapToDto(notification, bookingDto);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        return ResponseEntity.ok(notificationDtos);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDto> markNotificationAsRead(@PathVariable Long notificationId) throws Exception {
        Notification notification = notificationService.markNotificationAsRead(notificationId);
        ApiResponse<BookingDto> response = notificationServiceCB.getBookingById(notification.getBookingId());
        if (!response.isSuccess() || response.getData() == null) {
            throw new RuntimeException("Booking fetch failed");
        }
        BookingDto bookingDto = response.getData();
        return ResponseEntity.ok(NotificationMapper.mapToDto(notification, bookingDto));
    }



}
