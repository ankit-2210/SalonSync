package com.notificationservice.mapper;

import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.dto.NotificationDto;

public class NotificationMapper {
    public static NotificationDto mapToDto(Notification notification, BookingDto bookingDto){
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(notification.getId());
        notificationDto.setType(notification.getType());
        notificationDto.setIsRead(notification.getIsRead());
        notificationDto.setBookingId(notification.getBookingId());
        notificationDto.setUserId(notification.getUserId());
        notificationDto.setSalonId(notification.getSalonId());
        notificationDto.setCreatedAt(notification.getCreatedAt());
        return notificationDto;
    }

}
