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
import com.categoryservice.service.client.SalonFeignClient;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories/salon-owner")
public class SalonCategoryController {
    private final CategoryService categoryService;
    private final CategoryServiceCB categoryServiceCB;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody CategoryDto categoryDto, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
//        System.out.println("Salon Response: " + salonDtos);
        if (!salonDtos.isSuccess()) {
            return ResponseEntity.ok(new ApiResponse<>(false, salonDtos.getMessage(), null));
        }
        SalonDto salonDto = salonDtos.getData().stream()
                .filter(s -> s.getId().equals(categoryDto.getSalonId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Salon not found with given ID: " + categoryDto.getSalonId()));

//        System.out.println("Requested Salon ID: " + categoryDto.getSalonId());
        salonDtos.getData().forEach(s -> System.out.println("Available Salon: " + s.getId()));
        Category category = categoryService.saveCategory(categoryDto, salonDto);

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

        CategoryResponse response = CategoryMapper.toResponse(category, salonDto, userDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category Created Successfully", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto, @RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
        if (!salonDtos.isSuccess()) {
            return ResponseEntity.ok(new ApiResponse<>(false, salonDtos.getMessage(), null));
        }
        Category existingCategory = categoryService.getCategoryById(id);

        SalonDto salonDto = salonDtos.getData().stream()
                .filter(s->s.getId().equals(existingCategory.getSalonId()))
                .findFirst()
                .orElseThrow(()-> new RuntimeException("Unauthorized: This category does not belong to your salon"));
        Category updatedCategory = categoryService.updateCategory(id, categoryDto, salonDto);

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
        CategoryResponse response = CategoryMapper.toResponse(updatedCategory, salonDto, userDto);

        return ResponseEntity.ok(new ApiResponse<>(true, "Category updated successfully", response));
    }


    @GetMapping("/category/{id}/salon/{salonId}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryByIdAndSalonId(@PathVariable Long id, @PathVariable Long salonId) throws Exception {
        CompletableFuture<Category> categoryFuture =
                CompletableFuture.supplyAsync(()-> {
                    try {
                        return categoryService.getCategoryByIdAndSalonId(id, salonId);
                    }
                    catch (Exception e) {
                        throw new ResourceNotFoundException("Category Id not found");
                    }
                });
        CompletableFuture<SalonDto> salonFuture =
                CompletableFuture.supplyAsync(() -> {
                    try {
                        return categoryServiceCB
                                .getSalonById(salonId)
                                .getData();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
        CompletableFuture.allOf(categoryFuture, salonFuture).join();

        Category category = categoryFuture.join();
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

        CategoryResponse response = CategoryMapper.toResponse(category, salonDto, userDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category fetched successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> deleteCategory(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
        if (!salonDtos.isSuccess()) {
            return ResponseEntity.ok(new ApiResponse<>(false, salonDtos.getMessage(), null));
        }
        if(salonDtos.getData().isEmpty()){
            return ResponseEntity.ok(new ApiResponse<>(false, "No salons found for owner", null));
        }

        Category category = categoryService.getCategoryById(id);
        if (category == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Category not found", null));
        }

        SalonDto salonDto = salonDtos.getData().stream()
                .filter(s -> s.getId().equals(category.getSalonId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Unauthorized: This category does not belong to your salon"));

        categoryService.deleteCategoryById(id, salonDto.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Category Deleted Successfully!", null));
    }

}
