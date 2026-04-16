package com.bookingservice.service;

import com.bookingservice.model.PaymentOrder;
import com.bookingservice.payload.dto.BookingRequest;
import com.bookingservice.payload.dto.SalonDto;
import com.bookingservice.payload.dto.ServiceDto;
import com.bookingservice.payload.dto.UserDto;
import com.bookingservice.model.Booking;
import com.bookingservice.utils.SalonReport;
import com.bookingservice.utils.BookingStatus;

import java.time.LocalDate;
import java.util.*;

public interface BookingService {
    Booking createBooking(BookingRequest bookingRequest, UserDto userDto, SalonDto salonDto, Set<ServiceDto> serviceDtoSet) throws Exception;

    List<Booking> getBookingsByCustomer(Long customerId);

    List<Booking> getBookingsBySalon(Long salonId);

    Booking getBookingById(Long id) throws Exception;

    Booking updateBooking(Long bookingId, BookingStatus bookingStatus) throws Exception;

    List<Booking> getBookingsByDate(LocalDate date, Long salonId);

    SalonReport getSalonReport(Long salonId);

    Booking bookingSuccess(PaymentOrder paymentOrder) throws Exception;

}
