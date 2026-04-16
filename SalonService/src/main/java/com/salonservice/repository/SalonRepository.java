package com.salonservice.repository;

import com.salonservice.modal.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;


public interface SalonRepository extends JpaRepository<Salon, Long> {
    List<Salon> findByOwnerId(Long id);

    @Query("select s from Salon s where" +
            "(lower(s.city) like lower(concat('%', :keyword, '%')) OR " +
            "lower(s.name) like lower(concat('%', :keyword, '%')) OR " +
            "lower(s.address) like lower(concat('%', :keyword, '%')) )"
    )
    List<Salon> searchSalons(@Param("keyword") String keyword);



}
