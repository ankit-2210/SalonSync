package com.categoryservice.controller;

import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.service.CategoryService;
import com.categoryservice.service.Impl.CategoryServiceCB;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SalonCategoryControllerTest {
    private CategoryService categoryService = mock(CategoryService.class);
    private CategoryServiceCB categoryServiceCB = mock(CategoryServiceCB.class);

    private SalonCategoryController controller = new SalonCategoryController(categoryService, categoryServiceCB);

    @Test
    void createCategory() throws Exception{
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setSalonId(1L);

        SalonDto salonDto = new SalonDto();
        salonDto.setId(1L);

        when(categoryServiceCB.getSalonByOwnerId(anyString())).thenReturn(new ApiResponse<>(true, "ok", List.of(salonDto)));
        when(categoryService.saveCategory(any(), any())).thenReturn(new Category());

        ResponseEntity<ApiResponse<?>> response = controller.createCategory(categoryDto, "jwt");
        assertTrue(response.getBody().isSuccess());
    }

    @Test
    void deleteCategory() throws Exception{
        Category category = new Category();
        category.setId(1L);
        category.setSalonId(1L);

        SalonDto salonDto = new SalonDto();
        salonDto.setId(1L);

        when(categoryService.getCategoryById(1L)).thenReturn(category);
        when(categoryServiceCB.getSalonByOwnerId(anyString())).thenReturn(new ApiResponse<>(true, "ok", List.of(salonDto)));
        when(categoryService.saveCategory(any(), any())).thenReturn(new Category());

        ResponseEntity<ApiResponse<?>> response = controller.deleteCategory(1L, "jwt");
        assertTrue(response.getBody().isSuccess());
    }


}
