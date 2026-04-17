package com.bookingservice.model;


import jakarta.persistence.*;
import java.time.*;
import java.util.*;
import com.bookingservice.utils.BookingStatus;
import lombok.Data;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long salonId;

    private Long customerId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ElementCollection
    private Set<Long> serviceIds;

    private BookingStatus bookingStatus=BookingStatus.PENDING;

    private int totalPrice;
}
