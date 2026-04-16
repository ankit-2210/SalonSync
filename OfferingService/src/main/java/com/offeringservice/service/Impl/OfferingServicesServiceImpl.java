package com.offeringservice.service.Impl;

import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.ServiceDto;
import com.offeringservice.repository.OfferingRepository;
import com.offeringservice.service.OfferingServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferingServicesServiceImpl implements OfferingServicesService {
    private final OfferingRepository offeringRepository;

    @Override
    public OfferingService createService(SalonDto salonDto, ServiceDto serviceDto, CategoryDto categoryDto) {
        OfferingService offeringService = new OfferingService();
        offeringService.setImage(serviceDto.getImage());
        offeringService.setSalonId(salonDto.getId());
        offeringService.setName(serviceDto.getName());
        offeringService.setDescription(serviceDto.getDescription());
        offeringService.setCategoryId(categoryDto.getId());
        offeringService.setPrice(serviceDto.getPrice());
        offeringService.setDuration(serviceDto.getDuration());
        return offeringRepository.save(offeringService);
    }

    @Override
    public OfferingService updateService(Long serviceId, OfferingService service) throws Exception{
        OfferingService offeringService = offeringRepository.findById(serviceId)
                .orElseThrow(() -> new Exception("Service not exist with id: " + serviceId));

        offeringService.setName(service.getName());
        offeringService.setImage(service.getImage());
        offeringService.setDescription(service.getDescription());
        offeringService.setPrice(service.getPrice());
        offeringService.setDuration(service.getDuration());

        return offeringRepository.save(offeringService);
    }

    @Override
    public Set<OfferingService> getAllServiceBySalonId(Long salonId, Long categoryId) {
        List<OfferingService> serviceList = offeringRepository.findBySalonId(salonId);
        Set<OfferingService> offeringServices = new HashSet<>(serviceList);

        if (categoryId != null) {
            offeringServices = offeringServices.stream()
                    .filter(service -> service.getCategoryId() != null && service.getCategoryId().equals(categoryId))
                    .collect(Collectors.toSet());
        }

        return offeringServices;
    }

    @Override
    public Set<OfferingService> getServicesById(Set<Long> ids) {
        return new HashSet<>(offeringRepository.findAllById(ids));
    }

    @Override
    public OfferingService getServiceById(Long id) throws Exception {
        return offeringRepository.findById(id)
                .orElseThrow(() -> new Exception("Service not exist with id: " + id));
    }


}
