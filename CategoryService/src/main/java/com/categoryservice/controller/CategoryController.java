package com.categoryservice.controller;

import com.categoryservice.exception.ResourceNotFoundException;
import com.categoryservice.mapper.CategoryMapper;
import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.dto.UserDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.payload.response.CategoryResponse;
import com.categoryservice.service.CategoryService;
import com.categoryservice.service.Impl.CategoryServiceCB;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryServiceCB categoryServiceCB;

    @GetMapping("/salon/{id}")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoriesBySalon(@PathVariable Long id) throws Exception {
        Set<Category> categories = categoryService.getAllCategoriesBySalon(id);

        CompletableFuture<SalonDto> salonFuture =
                CompletableFuture.supplyAsync(()->{
                   try {
                       return categoryServiceCB.getSalonById(id).getData();
                   }
                   catch (Exception e){
                       throw new ResourceNotFoundException("Salon not found");
                   }
                });
        SalonDto salonDto = salonFuture.join();

        CompletableFuture<UserDto> userFuture =
                CompletableFuture.supplyAsync(()->{
                   try{
                       return categoryServiceCB.getUserById(salonDto.getOwnerId()).getData();
                   }
                   catch (Exception e){
                       throw new ResourceNotFoundException("User not found");
                   }
                });
        UserDto userDto = userFuture.join();

        List<CategoryResponse> responses = categories.stream()
                .map(category ->
                        CategoryMapper.toResponse(category, salonDto, userDto
                        ))
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(true, "Categories fetched successfully", responses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable Long id) throws Exception {
        Category category = categoryService.getCategoryById(id);

        CompletableFuture<SalonDto> salonFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return categoryServiceCB.getSalonById(category.getSalonId()).getData();
                    }
                    catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
        SalonDto salonDto = salonFuture.join();

        CompletableFuture<UserDto> userFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return categoryServiceCB.getUserById(salonDto.getOwnerId()).getData();
                    }
                    catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
        UserDto userDto = userFuture.join();

        CategoryResponse response = CategoryMapper.toResponse(category, salonDto, userDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category fetched successfully by id", response));
    }

    @GetMapping
    private ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();

        List<CategoryResponse> responses = new ArrayList<>();
        for (Category category : categories) {
            try {
                CompletableFuture<SalonDto> salonFuture =
                        CompletableFuture.supplyAsync(() -> {
                            try {
                                return categoryServiceCB.getSalonById(category.getSalonId()).getData();
                            }
                            catch (Exception e) {
                                throw new ResourceNotFoundException("Salon Id not found");
                            }
                        });
                SalonDto salonDto = salonFuture.get();

                CompletableFuture<UserDto> userFuture =
                        CompletableFuture.supplyAsync(() -> {
                            try {
                                return categoryServiceCB.getUserById(salonDto.getOwnerId()).getData();
                            }
                            catch (Exception e) {
                                throw new ResourceNotFoundException("User Id not found");
                            }
                        });
                UserDto userDto = userFuture.get();

                responses.add(CategoryMapper.toResponse(category, salonDto, userDto));
            }
            catch (Exception e) {
                System.err.println("Failed to process category " + category.getId() + ": " + e.getMessage());
            }
        }

        return ResponseEntity.ok(new ApiResponse<>(true, "All categories fetched", responses));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> deleteCategoryById(@PathVariable Long id) throws Exception{
        String category = categoryService.deleteCategoryById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, category, null));
    }

}
