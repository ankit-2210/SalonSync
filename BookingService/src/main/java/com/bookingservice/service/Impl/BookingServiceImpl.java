package com.bookingservice.service.Impl;

import com.bookingservice.model.PaymentOrder;
import com.bookingservice.payload.dto.BookingRequest;
import com.bookingservice.payload.dto.SalonDto;
import com.bookingservice.payload.dto.ServiceDto;
import com.bookingservice.payload.dto.UserDto;
import com.bookingservice.model.Booking;
import com.bookingservice.utils.SalonReport;
import com.bookingservice.repository.BookingRepository;
import com.bookingservice.service.BookingService;
import com.bookingservice.utils.BookingStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking createBooking(BookingRequest bookingRequest, UserDto userDto, SalonDto salonDto, Set<ServiceDto> serviceDtoSet) throws Exception {
        int totalDuration = serviceDtoSet.stream().mapToInt(ServiceDto::getDuration).sum();
        LocalDateTime bookingStartTime = bookingRequest.getStartTime();
        LocalDateTime bookingEndTime = bookingStartTime.plusMinutes(totalDuration);

        Boolean isSlotAvailable = isTimeSlotAvailable(salonDto, bookingStartTime, bookingEndTime);
        int totalPrice = serviceDtoSet.stream().mapToInt(ServiceDto::getPrice).sum();
        Set<Long> Ids = serviceDtoSet.stream().map(ServiceDto::getId).collect(Collectors.toSet());

        Booking booking = new Booking();
        booking.setCustomerId(userDto.getId());
        booking.setSalonId(salonDto.getId());
        booking.setServiceIds(Ids);
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setStartTime(bookingStartTime);
        booking.setEndTime(bookingEndTime);
        booking.setTotalPrice(totalPrice);
        return bookingRepository.save(booking);
    }

    private Boolean isTimeSlotAvailable(SalonDto salonDto, LocalDateTime bookingStartTime, LocalDateTime bookingEndTime) throws Exception {
        LocalDateTime salonOpenTime = salonDto.getOpenTime().atDate(bookingStartTime.toLocalDate());
        LocalDateTime salonCloseTime = salonDto.getCloseTime().atDate(bookingStartTime.toLocalDate());

        // Check salon working hours
        if(bookingStartTime.isBefore(salonOpenTime) || bookingEndTime.isAfter(salonCloseTime)){
            throw new RuntimeException("Booking time must be within salon working hours!");
        }

        // Check overlapping bookings
        List<Booking> existingBookings = getBookingsBySalon(salonDto.getId());
        for(Booking existsBookings: existingBookings){
            LocalDateTime startTime = existsBookings.getStartTime();
            LocalDateTime endTime = existsBookings.getEndTime();

            if(bookingStartTime.isBefore(endTime) && bookingEndTime.isAfter(startTime)){
                throw new RuntimeException("Slot not available, choose different time!");
            }
            if(bookingStartTime.isEqual(startTime) || bookingEndTime.isEqual(endTime)){
                throw new RuntimeException("Slot not available, choose different time!");
            }
        }

        return true;
    }

    @Override
    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Booking> getBookingsBySalon(Long salonId) {
        return bookingRepository.findBySalonId(salonId);
    }

    @Override
    public Booking getBookingById(Long id) throws Exception {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking == null){
            throw new Exception("Booking not found!");
        }

        return booking;
    }

    @Override
    public Booking updateBooking(Long bookingId, BookingStatus bookingStatus) throws Exception {
        Booking booking = getBookingById(bookingId);
        booking.setBookingStatus(bookingStatus);
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByDate(LocalDate date, Long salonId) {
        List<Booking> bookingList = getBookingsBySalon(salonId);
        if(date == null)
            return bookingList;

        return bookingList.stream().filter(booking -> isSameDate(booking.getStartTime(), date) || isSameDate(booking.getEndTime(), date))
                            .collect(Collectors.toList());

    }

    private boolean isSameDate(LocalDateTime dateTime, LocalDate date){
        return dateTime.toLocalDate().isEqual(date);
    }

    @Override
    public SalonReport getSalonReport(Long salonId) {
        List<Booking> bookingList = getBookingsBySalon(salonId);

        Integer totalBookings = bookingList.size();
        int totalEarnings = bookingList.stream().mapToInt(Booking::getTotalPrice).sum();
        List<Booking> cancelBookings = bookingList.stream().filter(booking ->
                        booking.getBookingStatus().equals(BookingStatus.CANCELLED)).toList();
        Double totalRefund = cancelBookings.stream().mapToDouble(Booking::getTotalPrice).sum();

        SalonReport salonReport = new SalonReport();
        salonReport.setSalonId(salonId);
        salonReport.setTotalEarnings(totalEarnings);
        salonReport.setTotalBookings(totalBookings);
        salonReport.setCancelledBookings(cancelBookings.size());
        salonReport.setTotalRefund(totalRefund);
        return salonReport;
    }

    @Override
    public Booking bookingSuccess(PaymentOrder paymentOrder) throws Exception {
        Booking booking = getBookingById(paymentOrder.getBookingId());
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }
}
