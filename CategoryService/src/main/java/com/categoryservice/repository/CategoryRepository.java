package com.categoryservice.repository;

import com.categoryservice.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Set<Category> findBySalonId(Long salonId);
    Optional<Category> findByIdAndSalonId(Long id, Long salonId);


}
