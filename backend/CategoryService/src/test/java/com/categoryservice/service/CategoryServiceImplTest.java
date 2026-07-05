package com.categoryservice.service;

import com.categoryservice.exception.UnauthorizedException;
import com.categoryservice.modal.Category;
import com.categoryservice.payload.dto.CategoryDto;
import com.categoryservice.payload.dto.SalonDto;
import com.categoryservice.repository.CategoryRepository;
import com.categoryservice.service.Impl.CategoryServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import java.util.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
public class CategoryServiceImplTest {
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Category category;
    private CategoryDto categoryDto;
    private SalonDto salonDto;
    @BeforeEach
    void setUp(){
        salonDto = new SalonDto();
        salonDto.setId(1L);

        categoryDto = new CategoryDto();
        categoryDto.setName("Hair");
        categoryDto.setImage("img.png");

        category = new Category();
        category.setId(1L);
        category.setName(categoryDto.getName());
        category.setSalonId(1L);
        category.setImage(categoryDto.getImage());
    }

    @Test
    void saveCategory(){
        when(categoryRepository.save(any())).thenReturn(category);
        Category result = categoryService.saveCategory(categoryDto, salonDto);
        assertNotNull(result);
        assertEquals("Hair", result.getName());
    }

    @Test
    void getAllCategories(){
        when(categoryRepository.findAll()).thenReturn(List.of(category));
        List<Category> categories = categoryService.getAllCategories();
        assertEquals(1, categories.size());
    }

    @Test
    void getCategoryById_NotFound() throws Exception {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        String result = categoryService.deleteCategoryById(1L);
        assertEquals("Category Deleted Successfully", result);
    }

    @Test
    void getCategoryByIdAndSalonId() {
        when(categoryRepository.findByIdAndSalonId(1L, 1L))
                .thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryByIdAndSalonId(1L, 1L);
        assertNotNull(result);
    }

    @Test
    void deleteCategory_WithSalon_Unauthorized() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        assertThrows(UnauthorizedException.class,
                () -> categoryService.deleteCategoryById(1L, 2L));
    }

}
