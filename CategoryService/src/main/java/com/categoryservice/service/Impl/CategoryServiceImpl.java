package com.categoryservice.service.Impl;

import com.categoryservice.exception.ResourceNotFoundException;
import com.categoryservice.exception.UnauthorizedException;
import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.repository.CategoryRepository;
import com.categoryservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(CategoryDto categoryDto, SalonDto salonDto) {
        Category newCategory = new Category();
        newCategory.setName(categoryDto.getName());
        newCategory.setSalonId(salonDto.getId());
        newCategory.setImage(categoryDto.getImage());
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category updateCategory(Long categoryId, CategoryDto categoryDto, SalonDto salonDto) throws  Exception{
        Category existingCategory = categoryRepository.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category not found with id: " + categoryId));
        if(!existingCategory.getSalonId().equals(salonDto.getId())){
            throw new UnauthorizedException("This category does not belong to your salon");
        }
        existingCategory.setName(categoryDto.getName() != null ? categoryDto.getName() : existingCategory.getName());
        existingCategory.setImage(categoryDto.getImage() != null ? categoryDto.getImage() : existingCategory.getImage());
        return categoryRepository.save(existingCategory);
    }


    @Override
    public Set<Category> getAllCategoriesBySalon(Long id) {
        return categoryRepository.findBySalonId(id);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found with id: " + id));
    }

    @Override
    public String deleteCategoryById(Long id) throws Exception{
        Category category = categoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
        return "Category Deleted Successfully";
    }

    @Override
    public Category getCategoryByIdAndSalonId(Long id, Long salonId) {
        return categoryRepository.findByIdAndSalonId(id, salonId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found for this salon"));
    }

    @Override
    public void deleteCategoryById(Long id, Long salonId){
        Category category = getCategoryById(id);
        if (!Objects.equals(category.getSalonId(), salonId)) {
            throw new UnauthorizedException("You don't have permission to delete this category!");
        }
        categoryRepository.deleteById(id);

    }
}
