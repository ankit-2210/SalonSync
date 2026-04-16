package com.categoryservice.controller;

import com.categoryservice.mapper.CategoryMapper;
import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.service.CategoryService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/salon/{id}")
    public ResponseEntity<ApiResponse<?>> getCategoriesBySalon(@PathVariable Long id){
        Set<Category> categories = categoryService.getAllCategoriesBySalon(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Categories fetched successfully", categories));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getCategoryById(@PathVariable Long id) throws Exception {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category fetched successfully by id", category));
    }

    @GetMapping
    private ResponseEntity<ApiResponse<?>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();
        List<CategoryDto> categoryDtos = categories.stream().map(CategoryMapper::mapToDTO).toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "All categories fetched", categoryDtos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteCategoryById(@PathVariable Long id) throws Exception{
        String category = categoryService.deleteCategoryById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, category, null));
    }


}
