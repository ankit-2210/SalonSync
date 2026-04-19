package com.notificationservice.payload.dto;

import com.notificationservice.utils.BookingStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingDto {
    private Long id;
    private Long salonId;
    private Long customerId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;
    private BookingStatus bookingStatus;
    private int totalPrice;
    private Set<ServiceDto> serviceDtoList;
    private UserDto userDto;
    private SalonDto salonDto;
}
