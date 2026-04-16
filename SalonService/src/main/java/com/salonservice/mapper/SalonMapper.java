package com.salonservice.mapper;

import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;

public class SalonMapper {

    public static SalonDto mapToDTO(Salon salon){
        SalonDto salonDto = new SalonDto();
        salonDto.setId(salon.getId());
        salonDto.setName(salon.getName());
        salonDto.setEmail(salon.getEmail());
        salonDto.setAddress(salon.getAddress());
        salonDto.setCity(salon.getCity());
        salonDto.setImages(salon.getImages());
        salonDto.setCloseTime(salon.getCloseTime());
        salonDto.setOpenTime(salon.getOpenTime());
        salonDto.setPhoneNumber(salon.getPhoneNumber());
        salonDto.setOwnerId(salon.getOwnerId());
        return salonDto;
    }

}
