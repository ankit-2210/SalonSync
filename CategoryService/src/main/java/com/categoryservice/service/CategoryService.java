package com.categoryservice.service;

import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;

import java.util.*;

public interface CategoryService {
    Category saveCategory(CategoryDto categoryDto, SalonDto salonDto);

    Category updateCategory(Long categoryId, CategoryDto categoryDto, SalonDto salonDto) throws  Exception;

    Set<Category> getAllCategoriesBySalon(Long id);

    List<Category> getAllCategories();

    Category getCategoryById(Long id) throws Exception;

    String deleteCategoryById(Long id) throws Exception;

    Category getCategoryByIdAndSalonId(Long id, Long salonId) throws Exception;

    void deleteCategoryById(Long id, Long salonId) throws Exception;
}
