package com.categoryservice.mapper;

import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;

public class CategoryMapper {
    public static CategoryDto mapToDTO(Category category){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setImage(category.getImage());
        categoryDto.setSalonId(category.getSalonId());
        return categoryDto;
    }
}
