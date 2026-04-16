package com.categoryservice.controller;

import com.categoryservice.mapper.CategoryMapper;
import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.payload.response.ApiResponse;
import com.categoryservice.service.CategoryService;
import com.categoryservice.service.Impl.CategoryServiceCB;
import com.categoryservice.service.client.SalonFeignClient;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories/salon-owner")
public class SalonCategoryController {
    private final CategoryService categoryService;
    private final CategoryServiceCB categoryServiceCB;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createCategory(@RequestBody CategoryDto categoryDto, @RequestHeader("Authorization") String jwt) throws Exception {
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
        System.out.println("Salon Response: " + salonDtos);
        if (!salonDtos.isSuccess()) {
            return ResponseEntity.status(503).body(salonDtos);
        }
        if (salonDtos.getData().isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "No salons found for owner", null));
        }
        System.out.println("Requested Salon ID: " + categoryDto.getSalonId());
        salonDtos.getData().forEach(s -> System.out.println("Available Salon: " + s.getId()));
        SalonDto salonDto = salonDtos.getData().stream()
                .filter(s -> s.getId().equals(categoryDto.getSalonId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Salon not found with given ID: " + categoryDto.getSalonId()));
        Category categories = categoryService.saveCategory(categoryDto, salonDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category Created Successfully", categories));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto, @RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess()){
            return ResponseEntity.status(503).body(salonDtos);
        }
        if(salonDtos.getData().isEmpty()){
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "No salons found for owner", null));
        }
        Category existingCategory = categoryService.getCategoryById(id);
        if (existingCategory == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "Category not found", null));
        }
        SalonDto salonDto = salonDtos.getData().stream()
                .filter(s->s.getId().equals(existingCategory.getSalonId()))
                .findFirst()
                .orElseThrow(()-> new RuntimeException("Unauthorized: This category does not belong to your salon"));

        Category updatedCategory = categoryService.updateCategory(id, categoryDto, salonDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category updated successfully", updatedCategory));
    }


    @GetMapping("/category/{id}/salon/{salonId}")
    public ResponseEntity<ApiResponse<CategoryDto>> getCategoryByIdAndSalonId(@PathVariable Long id, @PathVariable Long salonId) throws Exception {
        Category category = categoryService.getCategoryByIdAndSalonId(id, salonId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Category fetched successfully", CategoryMapper.mapToDTO(category)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteCategory(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        ApiResponse<List<SalonDto>> salonDtos = categoryServiceCB.getSalonByOwnerId(jwt);
        if(!salonDtos.isSuccess()){
            return ResponseEntity.ok(salonDtos);
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
