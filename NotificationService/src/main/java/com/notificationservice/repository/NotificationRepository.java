package com.notificationservice.repository;

import com.notificationservice.modal.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findBySalonId(Long salonId);

}
