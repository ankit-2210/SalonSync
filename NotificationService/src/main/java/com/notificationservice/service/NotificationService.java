package com.notificationservice.service;

import com.notificationservice.modal.Notification;
import com.notificationservice.payload.dto.NotificationDto;
import java.util.*;

public interface NotificationService {
    NotificationDto createNotification(Notification notification) throws Exception;
    List<Notification> getAllNotificationByUserId(Long userId);
    List<Notification> getAllNotificationBySalonId(Long salonId);
    Notification markNotificationAsRead(Long notificationId) throws Exception;

}
