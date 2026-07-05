package com.userservice.payload.response;

import com.userservice.utils.UserRole;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String refresh_token;
    private String message;
    private String title;
    private UserRole userRole;

}
