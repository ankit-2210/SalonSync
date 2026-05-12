package com.bookingservice.payload.dto;

import com.bookingservice.utils.BookingStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Data
public class BookingReportDto {
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private BookingStatus bookingStatus;

    private int totalPrice;

    private String customerName;
    private String customerEmail;

    private String salonName;
    private String salonAddress;
    private String salonPhone;
    private String salonEmail;

    private LocalTime openTime;
    private LocalTime closeTime;

    private Integer totalDuration;

    private Set<ServiceDto> serviceDtoList;
}
