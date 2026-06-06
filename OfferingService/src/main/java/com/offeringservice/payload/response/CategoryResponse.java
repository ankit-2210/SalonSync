package com.offeringservice.payload.response;

import com.offeringservice.payload.dto.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private String image;
    private Long salonId;
    private CategoryDto categoryDto;
    private SalonDto salonDto;
    private UserDto userDto;
}
