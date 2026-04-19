package com.bookingservice.controller;

import com.bookingservice.mapper.BookingMapper;
import com.bookingservice.model.Booking;
import com.bookingservice.payload.response.ApiResponse;
import com.bookingservice.service.Impl.BookingServiceCB;
import com.bookingservice.utils.SalonReport;
import com.bookingservice.payload.dto.BookingDto;
import com.bookingservice.payload.dto.*;
import com.bookingservice.payload.response.PaymentLinkResponse;
import com.bookingservice.service.BookingService;
import com.bookingservice.service.client.OfferingFeignClient;
import com.bookingservice.service.client.PaymentFeignClient;
import com.bookingservice.service.client.SalonFeignClient;
import com.bookingservice.service.client.UserFeignClient;
import com.bookingservice.utils.BookingStatus;
import com.bookingservice.utils.PaymentMethod;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final BookingServiceCB bookingServiceCB;

    // create booking
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createBooking(@RequestParam Long salonId, @RequestParam PaymentMethod paymentMethod, @RequestBody BookingRequest bookingRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<UserDto> userDto = bookingServiceCB.getUserProfile(jwt);
        if(!userDto.isSuccess()){
            return ResponseEntity.ok(userDto);
        }
        ApiResponse<SalonDto> salonDto = bookingServiceCB.getSalonById(salonId);
        if(!salonDto.isSuccess()){
            return ResponseEntity.ok(salonDto);
        }
        ApiResponse<Set<ServiceDto>> serviceDtoSet = bookingServiceCB.getServicesByIds(bookingRequest.getServiceIds());
        if(!serviceDtoSet.isSuccess()){
            return ResponseEntity.ok(serviceDtoSet);
        }

        Booking booking = bookingService.createBooking(bookingRequest, userDto.getData(), salonDto.getData(), serviceDtoSet.getData());
        booking = bookingService.saveBooking(booking);
        Set<ServiceDto> serviceDto = serviceDtoSet.getData();
        SalonDto salonDto1 = salonDto.getData();
        UserDto userDto1 = userDto.getData();

        BookingDto bookingDto = BookingMapper.bookingDto(booking, serviceDto, salonDto1, userDto1);
        System.out.println("Calling Payment Service...");
        ApiResponse<PaymentLinkResponse> paymentLinkResponse = bookingServiceCB.createPaymentLink(bookingDto, paymentMethod, jwt);
        System.out.println("Response received: " + paymentLinkResponse);
        if (!paymentLinkResponse.isSuccess()) {
            return ResponseEntity.ok(paymentLinkResponse);
        }

        return ResponseEntity.ok(new ApiResponse<>(true, "Booking Created", paymentLinkResponse.getData()));
    }

    // get bookings by customer
    @GetMapping("/customer")
    public ResponseEntity<ApiResponse<?>> getBookingsByCustomer(@RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<UserDto> userDto = bookingServiceCB.getUserProfile(jwt);
        if(!userDto.isSuccess()){
            return ResponseEntity.ok(userDto);
        }
        if(userDto.getData().getId() == null){
            return ResponseEntity.ok(new ApiResponse<>(false, "User not found from jwt!!", null));
        }

        List<Booking> bookings = bookingService.getBookingsByCustomer(userDto.getData().getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Bookings fetched", getBookingDto(bookings)));
    }

    @GetMapping("/salon")
    public ResponseEntity<ApiResponse<?>> getBookingsBySalon(@RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = bookingServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess()){
            return ResponseEntity.ok(salonDtos);
        }
        if(salonDtos.getData().isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(false, "No salons found for owner", null));
        }

        List<Long> salonIds = salonDtos.getData().stream().map(SalonDto::getId).toList();
        List<Booking> allBookings = bookingService.getBookingsBySalonIds(salonIds);
        return ResponseEntity.ok(new ApiResponse<>(true, "Salon bookings fetched", getBookingDto(allBookings)));
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<ApiResponse<?>> getBookingsBySalonId(@PathVariable Long salonId, @RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = bookingServiceCB.getSalonByOwnerId(jwt);
        boolean valid = salonDtos.getData().stream().anyMatch(s->s.getId().equals(salonId));
        if(!valid){
            return ResponseEntity.ok(new ApiResponse<>(false, "Unauthorized access to salon", null));
        }

        List<Booking> bookings = bookingService.getBookingsBySalon(salonId);
        return ResponseEntity.ok(new ApiResponse<>(true, "SalonId fetched", getBookingDto(bookings)));
    }

    private Set<BookingDto> getBookingDto(List<Booking> bookings){
        return bookings.stream().map(booking->{
            Set<ServiceDto> serviceDtos = bookingServiceCB.getServicesByIds(booking.getServiceIds()).getData();
            SalonDto salonDto;
            UserDto userDto;
            try{
                salonDto = bookingServiceCB.getSalonById(booking.getSalonId()).getData();
                userDto = bookingServiceCB.getUserById(booking.getCustomerId()).getData();
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
            return BookingMapper.bookingDto(booking, serviceDtos, salonDto, userDto);
        }).collect(Collectors.toSet());
    }

    // get booking by id
    @GetMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<BookingDto>> getBookingById(@PathVariable("bookingId") Long bookingId) throws Exception {
        Booking booking = bookingService.getBookingById(bookingId);
        Set<ServiceDto> serviceDtos = bookingServiceCB.getServicesByIds(booking.getServiceIds()).getData();
        SalonDto salonDto = bookingServiceCB.getSalonById(booking.getSalonId()).getData();
        UserDto userDto = bookingServiceCB.getUserById(booking.getCustomerId()).getData();

        BookingDto bookingDto = BookingMapper.bookingDto(booking, serviceDtos, salonDto, userDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Booking fetched", bookingDto));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<ApiResponse<BookingDto>> updateBookingStatus(@PathVariable Long bookingId, @RequestParam BookingStatus bookingStatus) throws Exception {
        Booking booking = bookingService.updateBooking(bookingId, bookingStatus);
        Set<ServiceDto> serviceDtos = bookingServiceCB.getServicesByIds(booking.getServiceIds()).getData();
        SalonDto salonDto = bookingServiceCB.getSalonById(booking.getSalonId()).getData();
        UserDto userDto = bookingServiceCB.getUserById(booking.getCustomerId()).getData();
        BookingDto bookingDto = BookingMapper.bookingDto(booking, serviceDtos, salonDto, userDto);

        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", bookingDto));
    }

    @GetMapping("/slots/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingSlotDto>> getBookedSlot(@PathVariable Long salonId, @RequestParam LocalDate date) throws Exception {
        List<Booking> bookings = bookingService.getBookingsByDate(date, salonId);
        List<BookingSlotDto> bookingSlotDto = bookings.stream().map(booking -> {
            BookingSlotDto slotDto = new BookingSlotDto();
            slotDto.setStartTime(booking.getStartTime());
            slotDto.setEndTime(booking.getEndTime());
            return slotDto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(bookingSlotDto);
    }

    @GetMapping("/report")
    public ResponseEntity<ApiResponse<?>> getSalonsReport(@RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<List<SalonDto>> salonDtos = bookingServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess()){
            return ResponseEntity.ok(salonDtos);
        }
        if(salonDtos.getData().isEmpty()){
            return ResponseEntity.ok(new ApiResponse<>(false, "No salons found for owner", null));
        }
        List<SalonReport> salonReports = new ArrayList<>();
        for(SalonDto salonDto: salonDtos.getData()){
            SalonReport salonReport = bookingService.getSalonReport(salonDto.getId());
            salonReports.add(salonReport);
        }

        return ResponseEntity.ok(new ApiResponse<>(true, "Reports fetched", salonReports));
    }

    @GetMapping("/report/{salonId}")
    public ResponseEntity<ApiResponse<?>> getSalonReport(@PathVariable Long salonId, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<List<SalonDto>> salonDtos = bookingServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess()){
            return ResponseEntity.ok(salonDtos);
        }
        if(salonDtos.getData().isEmpty()){
            return ResponseEntity.ok(new ApiResponse<>(false, "No salons found for owner", null));
        }

        boolean valid = salonDtos.getData().stream().anyMatch(s->s.getId().equals(salonId));
        if(!valid){
            return ResponseEntity.ok(new ApiResponse<>(false, "No salons found for owner", null));
        }

        SalonReport salonReport = bookingService.getSalonReport(salonId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Report fetched", salonReport));
    }

}
