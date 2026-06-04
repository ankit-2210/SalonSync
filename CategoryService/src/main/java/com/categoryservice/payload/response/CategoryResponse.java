package com.categoryservice.payload.response;

import com.categoryservice.payload.dto.*;
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
    private SalonDto salonDto;
    private UserDto userDto;
}
