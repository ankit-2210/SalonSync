package com.userservice.model;

import com.userservice.modal.User;
import com.userservice.utils.UserRole;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {
    @Test
    void testUserGettersAndSetters() {
        User user = new User();

        user.setId(1L);
        user.setFullName("Ankit Agarwal");
        user.setUsername("ankit");
        user.setEmail("ankit@gmail.com");
        user.setPhone("1234567890");
        user.setRole(UserRole.ADMIN);
        user.setPassword("12345");

        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        assertEquals(1L, user.getId());
        assertEquals("Ankit Agarwal", user.getFullName());
        assertEquals("ankit", user.getUsername());
        assertEquals("ankit@gmail.com", user.getEmail());
        assertEquals("1234567890", user.getPhone());
        assertEquals(UserRole.ADMIN, user.getRole());
        assertEquals("12345", user.getPassword());
        assertEquals(now, user.getCreatedAt());
        assertEquals(now, user.getUpdatedAt());
    }
}
