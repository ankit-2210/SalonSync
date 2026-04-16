package com.offeringservice.mapper;


import com.offeringservice.modal.OfferingService;
import com.offeringservice.payload.dto.ServiceDto;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ServiceMapper {
   public ServiceDto mapToDto(OfferingService offeringService){
       ServiceDto serviceDto = new ServiceDto();
       serviceDto.setId(offeringService.getId());
       serviceDto.setName(offeringService.getName());
       serviceDto.setDescription(offeringService.getDescription());
       serviceDto.setPrice(offeringService.getPrice());
       serviceDto.setDuration(offeringService.getDuration());
       serviceDto.setSalonId(offeringService.getSalonId());
       serviceDto.setCategoryId(offeringService.getCategoryId());
       serviceDto.setImage(offeringService.getImage());
       return serviceDto;
   }

   public Set<ServiceDto> mapToDtoSet(Set<OfferingService> services){
       return services.stream().map(this::mapToDto).collect(Collectors.toSet());
   }
}
