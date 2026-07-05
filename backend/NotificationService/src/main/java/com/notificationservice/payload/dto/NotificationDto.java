package com.notificationservice.payload.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private String type;
    private Boolean isRead=false;
    private Long userId;
    private Long bookingId;
    private Long salonId;
    private LocalDateTime createdAt;
    private BookingDto bookingDto;

}
