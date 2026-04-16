package com.salonservice.service.Impl;

import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;
import com.salonservice.payload.dto.UserDto;
import com.salonservice.repository.SalonRepository;
import com.salonservice.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {

    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDto salonDto, UserDto userDto) {
        Salon salon = new Salon();
        salon.setName(salonDto.getName());
        salon.setAddress(salonDto.getAddress());
        salon.setEmail(salonDto.getEmail());
        salon.setCity(salonDto.getCity());
        salon.setImages(salonDto.getImages());
        salon.setOwnerId(userDto.getId());
        salon.setOpenTime(salonDto.getOpenTime());
        salon.setCloseTime(salonDto.getCloseTime());
        salon.setPhoneNumber(salonDto.getPhoneNumber());
        return salonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(SalonDto salonDto, UserDto userDto, Long salonId) throws Exception{
        Salon existingSalon = salonRepository.findById(salonId)
                .orElseThrow(() -> new Exception("Salon not found with id: " + salonId));

        if(!existingSalon.getOwnerId().equals(userDto.getId())) {
            throw new Exception("You are not authorized to update this salon");
        }

        existingSalon.setName(salonDto.getName());
        existingSalon.setImages(salonDto.getImages());
        existingSalon.setAddress(salonDto.getAddress());
        existingSalon.setPhoneNumber(salonDto.getPhoneNumber());
        existingSalon.setEmail(salonDto.getEmail());
        existingSalon.setCity(salonDto.getCity());
        existingSalon.setOpenTime(salonDto.getOpenTime());
        existingSalon.setCloseTime(salonDto.getCloseTime());
        return salonRepository.save(existingSalon);
    }

    @Override
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long salonId) throws Exception{
        Salon salon = salonRepository.findById(salonId).orElse(null);
        if(salon == null){
            throw new Exception("Salon not exist!");
        }
        return salon;
    }

    @Override
    public List<Salon> getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return salonRepository.searchSalons(city);
    }
}
