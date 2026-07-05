package com.bookingservice.service;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.payload.dto.BookingReportDto;

public interface JasperReportService {
    byte[] generateBookingPdf(BookingReportDto bookingReportDto);

}
