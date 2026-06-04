package com.categoryservice.mapper;

import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.dto.UserDto;
import com.categoryservice.payload.response.CategoryResponse;

public class CategoryMapper {
    public static CategoryDto mapToDTO(Category category){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setImage(category.getImage());
        categoryDto.setSalonId(category.getSalonId());
        return categoryDto;
    }

    public static CategoryResponse toResponse(Category category, SalonDto salonDto, UserDto userDto){
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .image(category.getImage())
                .salonId(category.getSalonId())
                .salonDto(salonDto)
                .userDto(userDto)
                .build();
    }
}
