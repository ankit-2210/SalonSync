package com.salonservice.service;

import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;
import com.salonservice.payload.dto.UserDto;
import java.util.*;

public interface SalonService {
    Salon createSalon(SalonDto salonDto, UserDto user);

    Salon updateSalon(SalonDto salonDto, UserDto userDto, Long salonId) throws Exception;

    List<Salon> getAllSalons();

    List<Salon> getAllSalonsActive();

    Salon getSalonById(Long salonId) throws Exception;

    List<Salon> getSalonByOwnerId(Long ownerId);

    List<Salon> searchSalonByCity(String city);

    void deleteSalon(Long salonId, Long userId);

    Salon toggleSalonStatus(Long salonId, Long userId);

}
