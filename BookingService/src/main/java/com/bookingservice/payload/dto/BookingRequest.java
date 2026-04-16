package com.bookingservice.payload.dto;

import lombok.Data;
import java.util.*;

import java.time.LocalDateTime;

@Data
public class BookingRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;

}
