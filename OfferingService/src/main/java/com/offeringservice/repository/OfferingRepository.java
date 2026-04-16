package com.offeringservice.repository;

import com.offeringservice.modal.OfferingService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OfferingRepository extends JpaRepository<OfferingService, Long> {
    List<OfferingService> findBySalonId(Long salonId);

}
