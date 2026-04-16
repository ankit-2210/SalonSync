package com.offeringservice.service;

import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.ServiceDto;

import java.util.Set;

public interface OfferingServicesService {
    OfferingService createService(SalonDto salonDto, ServiceDto serviceDto, CategoryDto categoryDto);

    OfferingService updateService(Long serviceId, OfferingService service) throws Exception;

    Set<OfferingService> getAllServiceBySalonId(Long salonId, Long categoryId);

    Set<OfferingService> getServicesById(Set<Long> ids);

    OfferingService getServiceById(Long id) throws Exception;

}
