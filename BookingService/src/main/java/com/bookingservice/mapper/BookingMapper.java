package com.bookingservice.mapper;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.model.Booking;
import com.bookingservice.payload.dto.SalonDto;
import com.bookingservice.payload.dto.ServiceDto;
import com.bookingservice.payload.dto.UserDto;

import java.util.*;

public class BookingMapper {
    public static BookingDto bookingDto(Booking booking, Set<ServiceDto> serviceDtoList, SalonDto salonDto, UserDto userDto){
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setSalonId(booking.getSalonId());
        bookingDto.setCustomerId(booking.getCustomerId());
        bookingDto.setBookingStatus(booking.getBookingStatus());
        bookingDto.setStartTime(booking.getStartTime());
        bookingDto.setEndTime(booking.getEndTime());
        bookingDto.setServiceIds(booking.getServiceIds());
        bookingDto.setTotalPrice(booking.getTotalPrice());
        bookingDto.setServiceDtoList(serviceDtoList);
        bookingDto.setUserDto(userDto);
        bookingDto.setSalonDto(salonDto);
        return bookingDto;
    }
}
