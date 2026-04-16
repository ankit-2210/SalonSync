package com.notificationservice.service.Impl;

import com.notificationservice.mapper.NotificationMapper;
import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.BookingDto;
import com.notificationservice.payload.dto.NotificationDto;
import com.notificationservice.repository.NotificationRepository;
import com.notificationservice.service.NotificationService;
import com.notificationservice.service.client.BookingFeignClient;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final BookingFeignClient bookingFeignClient;

    @Override
    public NotificationDto createNotification(Notification notification) throws Exception{
        Notification savedNotification = notificationRepository.save(notification);
        BookingDto bookingDto = bookingFeignClient.getBookingById(savedNotification.getBookingId()).getBody();
        return NotificationMapper.mapToDto(savedNotification, bookingDto);
    }

    @Override
    public List<Notification> getAllNotificationByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getAllNotificationBySalonId(Long salonId) {
        return notificationRepository.findBySalonId(salonId);
    }

    @Override
    public Notification markNotificationAsRead(Long notificationId) throws Exception{
        return notificationRepository.findById(notificationId).map(
                notification -> {
                    notification.setIsRead(true);
                    return notificationRepository.save(notification);
                }).orElseThrow(()->new Exception("Notification not found!"));
    }
}
