package com.salonservice.model;

import com.salonservice.modal.Salon;
import org.junit.jupiter.api.Test;
import java.time.LocalTime;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

public class SalonTest {
    @Test
    void testSalonModel(){
        Salon salon = new Salon();
        salon.setId(1L);
        salon.setName("Luxury Salon");
        salon.setImages(Arrays.asList("img1.jpg", "img2.jpg"));
        salon.setAddress("123 Street");
        salon.setPhoneNumber("9876543210");
        salon.setEmail("test@salon.com");
        salon.setCity("Kolkata");
        salon.setOwnerId(100L);
        salon.setOpenTime(LocalTime.of(9, 0));
        salon.setCloseTime(LocalTime.of(21, 0));

        // Assert
        assertEquals(1L, salon.getId());
        assertEquals("Luxury Salon", salon.getName());
        assertEquals(2, salon.getImages().size());
        assertEquals("123 Street", salon.getAddress());
        assertEquals("9876543210", salon.getPhoneNumber());
        assertEquals("test@salon.com", salon.getEmail());
        assertEquals("Kolkata", salon.getCity());
        assertEquals(100L, salon.getOwnerId());
        assertEquals(LocalTime.of(9, 0), salon.getOpenTime());
        assertEquals(LocalTime.of(21, 0), salon.getCloseTime());
    }

    @Test
    void testImagesList(){
        Salon salon = new Salon();
        salon.setImages(Arrays.asList("a.jpg", "b.jpg"));

        assertNotNull(salon.getImages());
        assertEquals(2, salon.getImages().size());
        assertTrue(salon.getImages().contains("a.jpg"));
    }

    @Test
    void testToString() {
        Salon salon = new Salon();
        salon.setName("Test Salon");
        String result = salon.toString();

        assertTrue(result.contains("Test Salon"));
    }

}
