package com.offeringservice.payload.response;


import com.offeringservice.payload.dto.CategoryDto;
import com.offeringservice.payload.dto.SalonDto;
import com.offeringservice.payload.dto.UserDto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceResponse {
    private Long id;

    private String name;
    private String description;
    private int price;
    private int duration;
    private String image;

    private CategoryDto categoryDto;
    private SalonDto salonDto;
    private UserDto userDto;
}
