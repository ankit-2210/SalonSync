package com.offeringservice.model;

import com.offeringservice.modal.OfferingService;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class OfferingServiceTest {
    @Test
    void testOfferingServiceModel(){
        OfferingService service = new OfferingService();
        service.setId(1L);
        service.setName("Hair Cut");
        service.setDescription("Basic hair cutting service");
        service.setPrice(300);
        service.setDuration(30);
        service.setSalonId(101L);
        service.setCategoryId(10L);
        service.setImage("image.jpg");

        // assert
        assertEquals(1L, service.getId());
        assertEquals("Hair Cut", service.getName());
        assertEquals("Basic hair cutting service", service.getDescription());
        assertEquals(300, service.getPrice());
        assertEquals(30, service.getDuration());
        assertEquals(101L, service.getSalonId());
        assertEquals(10L, service.getCategoryId());
        assertEquals("image.jpg", service.getImage());
    }

    @Test
    void testToString(){
        OfferingService service = new OfferingService();
        service.setName("Facial");

        String res = service.toString();
        assertTrue(res.contains("Facial"));
    }
}
