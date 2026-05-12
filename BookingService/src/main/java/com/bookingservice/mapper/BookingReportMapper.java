package com.bookingservice.mapper;

import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.payload.dto.BookingReportDto;
import com.bookingservice.payload.dto.ServiceDto;

public class BookingReportMapper {
    public static BookingReportDto mapToReportDto(BookingDto bookingDto){
        BookingReportDto bookingReportDto = new BookingReportDto();
        bookingReportDto.setId(bookingDto.getId());

        bookingReportDto.setStartTime(bookingDto.getStartTime());
        bookingReportDto.setEndTime(bookingDto.getEndTime());

        bookingReportDto.setBookingStatus(bookingDto.getBookingStatus());

        bookingReportDto.setTotalPrice(bookingDto.getTotalPrice());

        bookingReportDto.setCustomerName(bookingDto.getUserDto().getFullName());
        bookingReportDto.setCustomerEmail(bookingDto.getUserDto().getEmail());

        // Salon
        bookingReportDto.setSalonName(bookingDto.getSalonDto().getName());
        bookingReportDto.setSalonAddress(bookingDto.getSalonDto().getAddress());
        bookingReportDto.setSalonPhone(bookingDto.getSalonDto().getPhoneNumber());
        bookingReportDto.setSalonEmail(bookingDto.getSalonDto().getEmail());
        bookingReportDto.setOpenTime(bookingDto.getSalonDto().getOpenTime());
        bookingReportDto.setCloseTime(bookingDto.getSalonDto().getCloseTime());

        // Services
        bookingReportDto.setServiceDtoList(bookingDto.getServiceDtoList());

        // Total Duration
        int duration = bookingDto.getServiceDtoList()
                .stream()
                .mapToInt(ServiceDto::getDuration)
                .sum();
        bookingReportDto.setTotalDuration(duration);
        return bookingReportDto;
    }
}
