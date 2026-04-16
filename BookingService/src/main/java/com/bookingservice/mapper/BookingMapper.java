package com.bookingservice.mapper;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.model.Booking;

public class BookingMapper {
    public static BookingDto bookingDto(Booking booking){
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setSalonId(booking.getSalonId());
        bookingDto.setCustomerId(booking.getCustomerId());
        bookingDto.setBookingStatus(booking.getBookingStatus());
        bookingDto.setStartTime(booking.getStartTime());
        bookingDto.setEndTime(booking.getEndTime());
        bookingDto.setServiceIds(booking.getServiceIds());
        bookingDto.setTotalPrice(booking.getTotalPrice());
        return bookingDto;
    }
}
