package com.userservice.payload.dto;

import com.userservice.utils.UserRole;
import lombok.Data;

@Data
public class SignDTO {
    private String fullName;
    private String email;
    private String password;
    private String username;
    private UserRole role;

}
